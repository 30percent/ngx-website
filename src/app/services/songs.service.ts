import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Song } from '../classes/song';
import { Howl, Howler } from 'howler'
import 'rxjs/add/operator/map';
import { findIndex, get, map, flatten, capitalize } from 'lodash';
import * as $ from 'jquery';
import { Promise } from 'bluebird';


@Injectable()
export class SongsService {

  songs: Song[];
  currentInd: number;
  playlist: Song[];
  progresstickID;
  trackTime: string;
  progressedTime: string;
  isPlaying: boolean;
  getJSONProm = Promise.promisify(
    (url, success, fail) => $.getJSON(url, success, fail))

  constructor() {

  }

  public getCurrent() {
    return this.playlist[this.currentInd];
  }


  list(): Observable<Song[]> {
    //this is quite the mess, still too much hard coded (need to add more meta to tracklist generator)
    return fromPromise(Promise.resolve($.getJSON("assets/albums/tracklist.json"))
      .then((resp: any) => {
        this.songs = flatten(map(resp.albums, (listing: string[], albumname) => {
          return map(listing, (filename) => {
            return {
              title: capitalize(filename.slice(0, -4)),
              author: "Closed Door Insights",
              src: resp.location + "/" + albumname + "/" + filename,
              waveform: resp.location + "/" + albumname + "/" + filename.slice(0, -4) + ".png"
            } as Song
          })
        })) as Song[]
        return this.songs;
      }))
  }

  formatTime(secs) {
    secs = Math.round(secs);
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  playSong(song?) {
    const self = this;
    const currentPlaying = this.getCurrent();
    if (!song) {
      if (currentPlaying) song = currentPlaying;
      else return;
    } else if (song != currentPlaying) {
      this.stop();
    }
    this.currentInd = findIndex(this.playlist, song);
    if (this.currentInd < 0) {
      this.createPlaylist([song]);
      this.currentInd = 0;
    }
    if (!song.howl) {
      song.howl = new Howl({
        src: song.src,
        html5: true,
        onplay: () => {
          this.isPlaying = true;
          this.trackTime = this.formatTime(song.howl.duration());
          this.progressedTime = this.formatTime(song.howl.seek() || 0);
          this.progresstickID = setInterval(() => {
            this.progressedTime = this.formatTime(song.howl.seek() || 0);
          }, 1000)
        },
        onpause: () => {
          clearInterval(this.progresstickID);
          this.isPlaying = false;
        },
        onend: () => {
          clearInterval(this.progresstickID);
          this.next();
        },
        onstop: () => {
          clearInterval(this.progresstickID);
          this.progressedTime = this.formatTime(0);
        }
      });
    }
    song.howl.play();
  }

  pause() {
    let currentPlaying = this.getCurrent();
    if (currentPlaying) {
      currentPlaying.howl.pause();
      this.isPlaying = false;
    }
  }

  stop() {
    let currentPlaying = this.getCurrent();
    if (currentPlaying) {
      currentPlaying.howl.stop();
      this.isPlaying = false;
    }
  }

  continue() {
    let currentPlaying = this.getCurrent();
    if (currentPlaying) {
      this.playSong(currentPlaying);
    }
  }

  createPlaylist(songs: Song[]) {
    this.playlist = songs;
  }

  next() {
    this.stop();
    if (!this.playlist) {
      return;
    }
    if (this.playlist.length - 1 > this.currentInd) {
      this.currentInd += 1;
      this.playSong(this.playlist[this.currentInd]);
    }
  }

  prev() {
    this.stop();
    if (!this.playlist) {
      return;
    }
    if (this.currentInd > 0) {
      this.currentInd -= 1;
      this.playSong(this.playlist[this.currentInd]);
    }
  }

  seek(percent) {
    let song = this.getCurrent().howl;
    song.seek(song.duration() * percent);
  }
}
