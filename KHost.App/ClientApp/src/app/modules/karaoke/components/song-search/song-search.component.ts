import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiButtonMode } from 'src/app/modules/kommon/models/MultiButtonMode';
import { Song, SongState } from 'src/app/modules/kommon/models/Song';
import { SongsProvider } from 'src/app/modules/kommon/providers/SongsProvider';
import { QueuedSinger } from '../../models/QueuedSinger';


@Component({
  selector: 'kh-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent {
  
  @Input()
  selectedQueuedSinger: QueuedSinger|null = null;

  selectedSong: Song|null = null;

  songs: Song[] | null = null;

  queryControl = new FormControl('');

  searchModes:MultiButtonMode[] = [
    {
      text: "Local",
      value: "local"
    },
    {
      text: "YouTube",
      value: "youtube"
    }
  ]

  private _selectedSearchMode:MultiButtonMode = this.searchModes[0];
  get selectedSearchMode() { return this._selectedSearchMode; }
  set selectedSearchMode(value: MultiButtonMode) {
    this.songs = null;
    this.selectedSong = null;
    this._selectedSearchMode = value;
  }

  constructor(private _songsProvider: SongsProvider) { 
    
  }

  search(): void {
    this.songs = [];
    this._songsProvider.search(this.queryControl.value)
      .then(value => { this.songs = value; });
  }
}
