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
export class SongSearchComponent implements OnInit {
  @Input() selectedQueuedSinger: QueuedSinger|null = null;

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

  selectedSearchMode:MultiButtonMode = this.searchModes[0];

  constructor(private _songsProvider: SongsProvider) { 
    
  }

  ngOnInit(): void {
    
  }

  search(): void {
    this.songs = [];
    this._songsProvider.search(this.queryControl.value)
      .subscribe(
        value => { this.songs = value; }
      )
  }

  setSearchMode(mode: MultiButtonMode): void {
    this.songs = null;
    this.selectedSearchMode = mode;
  }

  selectSong(e: any, song: Song): void {
    this.selectedSong = song;
  }
}
