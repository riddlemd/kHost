import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/Song';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';

@Component({
  templateUrl: './songs-manager.component.html',
  styleUrls: ['./songs-manager.component.scss']
})
export class SongsManagerComponent implements OnInit {

  songs: Song[] = [];

  selectedSong?: Song;

  constructor(private _songsProvider: SongsProvider) { }

  ngOnInit(): void {
    this._songsProvider.read()
      .then(value => { this.songs = value; });
  }
}
