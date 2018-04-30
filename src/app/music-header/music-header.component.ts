import { Component, OnInit } from '@angular/core';
import { SongsService } from '../services/songs.service';

import { map, capitalize } from 'lodash/fp'
@Component({
  selector: 'app-music-header',
  templateUrl: './music-header.component.html',
  styleUrls: ['./music-header.component.css']
})
export class MusicHeaderComponent implements OnInit {
  albums: {}[]
  tidbits: {}[]
  constructor(private SongsService: SongsService) { }

  ngOnInit() {
    this.tidbits = [
      {
        title: "Safe Eval",
        route: "safe-eval"
      },
      {
        title: "Json Editor",
        route: "json-editor"
      }
    ]
    this.albums = [];
    this.SongsService.albums()
      .subscribe(
      (list) => {
        this.albums = map((name) => ({ id: name, title: capitalize(name) }), list)
      }
      )

  }

}
