import { Component, OnInit } from '@angular/core';
import { Song } from '../kommon/models/Song';
import { SongsProvider } from '../kommon/providers/SongsProvider';

@Component({
  selector: 'kh-songs-manager',
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
    this._songsProvider.get()
      .subscribe(
        value => { this.songs = value; }
      )
  }
}
