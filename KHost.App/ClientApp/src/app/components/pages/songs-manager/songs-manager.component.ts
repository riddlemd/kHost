import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/Song';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';

@Component({
  templateUrl: './songs-manager.component.html',
  styleUrls: ['./songs-manager.component.scss']
})
export class SongsManagerComponent implements OnInit {

  songs: Song[] = [];

  private _selectedSong: Song|null = null;
  get selectedSong() { return this._selectedSong; }
  set selectedSong(song: Song|null) {this._selectedSong = song; }

  constructor(private _songsProvider: SongsProvider) { }

  ngOnInit(): void {
    this._songsProvider.read()
      .then(value => { this.songs = value; });
  }
}
