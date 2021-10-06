import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiButtonMode } from 'src/app/modules/kommon/models/MultiButtonMode';
import { QueuedSinger } from '../../models/QueuedSinger';
import { SongSearchResult } from '../../models/SongSearchResult';
import { SongSearchProvider } from '../../providers/SongSearchProvider';


@Component({
  selector: 'kh-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent implements OnInit {
  
  @Input()
  selectedQueuedSinger: QueuedSinger|null = null;

  selectedSongSearchResult: SongSearchResult|null = null;

  songSearchResults: SongSearchResult[]|null = null;

  queryControl = new FormControl('');

  searchModes:MultiButtonMode[] = []

  private _selectedSearchMode:MultiButtonMode = this.searchModes[0];
  get selectedSearchMode() { return this._selectedSearchMode; }
  set selectedSearchMode(value: MultiButtonMode) {
    this.songSearchResults = null;
    this.selectedSongSearchResult = null;
    this._selectedSearchMode = value;
  }

  constructor(private _songSearchProvider: SongSearchProvider) { 
    
  }

  ngOnInit() {
    this._songSearchProvider.getSongSearchEngines()
      .then(engines => {
        for(let engine of engines) {
          const searchMode = new MultiButtonMode();
          searchMode.text = engine.displayName;
          searchMode.value = engine;

          this.searchModes.push(searchMode);
        }

        this.selectedSearchMode = this.searchModes[0];

        console.info(this.searchModes);
      });
  }

  getSongSearchResultsCount(): number {
    return this.songSearchResults?.length ?? 0;
  }

  search(): void {
    this.songSearchResults = [];
    this._songSearchProvider.search(this.queryControl.value, this.selectedSearchMode.value)
      .then(songSearchResults => { 
        this.songSearchResults = songSearchResults;
      });
  }
}
