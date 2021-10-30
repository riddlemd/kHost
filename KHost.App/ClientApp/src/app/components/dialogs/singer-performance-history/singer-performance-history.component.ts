import { Component, Inject, OnInit } from '@angular/core';
import { SingerPerformance } from 'src/app/models/SingerPerformance';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSongsProvider } from 'src/app/services/providers/QueuedSongsProvider';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingerPerformancesProvider } from 'src/app/services/providers/SingerPerformancesProvider';
import { SongsProvider } from 'src/app/services/providers/SongsProvider';
import { Song } from 'src/app/models/Song';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { VenuesProvider } from 'src/app/services/providers/VenuesProvider';
import { SingersProvider } from 'src/app/services/providers/SingersProvider';

@Component({
  templateUrl: './singer-performance-history.component.html',
  styleUrls: ['./singer-performance-history.component.scss']
})
export class SingerPerformanceHistoryComponent implements OnInit {

  private _selectedQueuedSinger: QueuedSinger;
  get selectedQueuedSinger() { return this._selectedQueuedSinger; }

  private _singerPerformances: SingerPerformance[] = [];
  get singerPerformances() { return this._singerPerformances; }

  private _loading: boolean = false;
  get loading() { return this._loading; }

  selectedSingerPerformance?: SingerPerformance;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {
      selectedQueuedSinger: QueuedSinger
    },
    private _dialogRef: MatDialogRef<SingerPerformanceHistoryComponent>,
    private _singerPerformancesProvider: SingerPerformancesProvider,
    private _songsProvider: SongsProvider,
    private _venuesProvider: VenuesProvider,
    private _queuedSongsProvider: QueuedSongsProvider,
  ) {
    this._selectedQueuedSinger = data.selectedQueuedSinger;
  }

  ngOnInit(): void {
    this.loadSingerPerformancesForSelectedSinger();
  }

  getPerformanceCount(): number {
    return this._singerPerformances.length;
  }

  async addSelectedSongToSelectedQueuedSinger() {
    const newQueuedSong = new QueuedSong();
    newQueuedSong.queuedSingerId = this._selectedQueuedSinger.id;
    newQueuedSong.queuedSinger = this._selectedQueuedSinger;
    newQueuedSong.songId = this.selectedSingerPerformance?.song?.id;
    newQueuedSong.song = this.selectedSingerPerformance?.song;

    await this._queuedSongsProvider.create(newQueuedSong);

    this._dialogRef.close();
  }

  private async loadSingerPerformancesForSelectedSinger() {
    if(!this.selectedQueuedSinger?.singer) return;

    this._loading = true;

    this._singerPerformances = [];

    const singerPerformances = await this._singerPerformancesProvider.findBySinger(this.selectedQueuedSinger.singer);

    if(!singerPerformances.length) {
      this._loading = false;
      return;
    }

    const [songs, venues] = await Promise.all([
      this._songsProvider.findByIds(singerPerformances.map(sp => sp.songId ?? 0)),
      this._venuesProvider.findByIds(singerPerformances.map(sp => sp.songId ?? 0))
    ]);

    for(let singerPerformance of singerPerformances) {
      const song = songs.find(s => s.id == singerPerformance.songId);

      const venue = venues.find(v => v.id == singerPerformance.venueId);

      if(!song?.id) continue;

      singerPerformance.song = song;
      singerPerformance.songId = song.id;

      if(venue) {
        singerPerformance.venue = venue;
        singerPerformance.songId = venue.id; 
      }
    }

    this._singerPerformances = singerPerformances;

    this._loading = false;
  }
  
}
