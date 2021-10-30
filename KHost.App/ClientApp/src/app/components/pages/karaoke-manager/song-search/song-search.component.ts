import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiButtonMode } from 'src/app/modules/kommon/models/MultiButtonMode';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { SongSearchResult } from 'src/app/models/SongSearchResult';
import { SongSearchProvider } from 'src/app/services/providers/SongSearchProvider';
import { QueuedSongsProvider } from 'src/app/services/providers/QueuedSongsProvider';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { MatDialog } from '@angular/material/dialog';
import { EditSongComponent } from '../../../dialogs/edit-song/edit-song.component';


@Component({
  selector: 'kh-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss']
})
export class SongSearchComponent implements OnInit {
  
  @Input()
  selectedQueuedSinger?: QueuedSinger;

  selectedSongSearchResult?: SongSearchResult;

  songSearchResults?: SongSearchResult[];

  queryControl = new FormControl('');

  searchModes:MultiButtonMode[] = []

  private _selectedSearchMode:MultiButtonMode = this.searchModes[0];
  get selectedSearchMode() { return this._selectedSearchMode; }
  set selectedSearchMode(value: MultiButtonMode) {
    this.songSearchResults = undefined;
    this._selectedSearchMode = value;
  }

  constructor(
    private _songSearchProvider: SongSearchProvider,
    private _queuedSongsProvider: QueuedSongsProvider,
    private _dialog: MatDialog
  ) { 
    
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

        this.selectedSearchMode = this.searchModes.filter(sm => sm.value?.name === 'local')[0];
      });
  }

  getSongSearchResultsCount(): number {
    return this.songSearchResults?.length ?? 0;
  }

  async search(): Promise<void> {
    this.songSearchResults = undefined;

    if(!this.queryControl.value) return;

    this.songSearchResults = [];

    this.songSearchResults = await this._songSearchProvider.search(this.queryControl.value, this.selectedSearchMode.value);
  }

  async addSelectedSongResultSongToSelectedQueuedSinger(): Promise<void> {
    if(!this.selectedSongSearchResult) return;

    const song = await this._songSearchProvider.getSong(this.selectedSongSearchResult);

    const newQueuedSong = new QueuedSong();
    newQueuedSong.queuedSingerId = this.selectedQueuedSinger?.id;
    newQueuedSong.songId = song?.id;

    await this._queuedSongsProvider.create(newQueuedSong);
  }

  async openEditSongDialog(): Promise<void> {
    if(!this.selectedSongSearchResult) return;

    const song = await this._songSearchProvider.getSong(this.selectedSongSearchResult);

    const config = {
      data: {
        entity: song
      }
    };

    const dialogRef = this._dialog.open(EditSongComponent, config);

    await dialogRef.afterClosed().toPromise();
  }
}
