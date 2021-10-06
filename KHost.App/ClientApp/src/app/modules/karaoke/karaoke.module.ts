// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KommonModule } from '../kommon/kommon.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
// Components
import { KaraokeManagerComponent } from './karaoke-manager.component';
import { QueuedSingersComponent } from './components/queued-singers/queued-singers.component';
import { QueuedSongsComponent } from './components/queued-songs/queued-songs.component';
import { SongSearchComponent } from './components/song-search/song-search.component';
import { PerformanceControlsComponent } from './components/performance-controls/performance-controls.component';
// Providers
import { AddSingerComponent } from './components/add-singer/add-singer.component';
import { SingerPerformanceHistoryComponent } from './components/singer-performance-history/singer-performance-history.component';



@NgModule({
  providers: [
    
  ],
  declarations: [
    KaraokeManagerComponent,
    QueuedSingersComponent,
    QueuedSongsComponent,
    SongSearchComponent,
    PerformanceControlsComponent,
    AddSingerComponent,
    SingerPerformanceHistoryComponent
  ],
  imports: [
    CommonModule,
    KommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule
  ]
})
export class KaraokeModule { }
