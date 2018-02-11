import { Component, OnInit } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { Song } from '../classes/song';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { forEach, partial, bind } from 'lodash';

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

  constructor(private SongsService: SongsService) { }

  ngOnInit() {
    this.SongsService.list()
      .subscribe(songs => {
        this.songs = [];
        var addNextDelay = () => {
          if(songs.length <= 0) return;
          this.songs.push(songs.shift());
          setTimeout(partial(addNextDelay), 200)
        };
        addNextDelay();
        this.SongsService.createPlaylist(songs);
      });
  }

}
