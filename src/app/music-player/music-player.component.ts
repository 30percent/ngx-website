import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { SongsService } from '../services/songs.service';
import { Song } from '../classes/song';

import { forEach, partial, bind, clone, first, tail } from 'lodash';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('.5s ease-out', style({opacity: '1'})),
      ])
    ])
  ]
})
export class MusicPlayerComponent implements OnInit {
  songs: Song[];

  constructor(
    private SongsService: SongsService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.SongsService.album(this.route.snapshot.paramMap.get("name"))
      .subscribe(songs => {
        this.songs = [];
        this.SongsService.createPlaylist(songs);
        var addNextDelay = (songList) => {
          if(songList.length <= 0) return;

          this.songs.push(first(songList));
          setTimeout(partial(addNextDelay, tail(songList)), 200)
        };
        addNextDelay(songs);
      });
  }

}
