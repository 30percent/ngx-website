import { Component, OnInit } from '@angular/core';
import { Song } from '../classes/song';
import { SongsService } from '../services/songs.service';
import { findIndex, get } from 'lodash';
import * as $ from 'jquery';

@Component({
  selector: 'app-music-playing',
  templateUrl: './music-playing.component.html',
  styleUrls: ['./music-playing.component.css']
})
export class MusicPlayingComponent implements OnInit {
  constructor(private SongsService: SongsService) { }

  ngOnInit() {
  }

  getProgressWidth() {
    let song = this.SongsService.getCurrent().howl;
    let dur = song.duration();
    let cur: number = song.seek() as number || 0;
    return (cur / dur) * 100 + '%';
  }

  seek(event) {
    
    var x = event.pageX - $(event.currentTarget).offset().left;
    this.SongsService.seek(x / $(event.currentTarget).width());
  }
}
