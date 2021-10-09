// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
// Angular Material Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
// Angular CDK
import { DragDropModule } from '@angular/cdk/drag-drop';
// kHost Modules
import { KommonModule } from './modules/kommon/kommon.module';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from "./components/login/login.component";
// Providers
import { QueuedSongsProvider } from "src/app/services/providers/QueuedSongsProvider";
import { QueuedSingersProvider } from "./services/providers/QueuedSingersProvider";
import { SongsProvider } from "src/app/services/providers/SongsProvider";
import { SingersProvider } from "src/app/services/providers/SingersProvider";
import { VenuesProvider } from "src/app/services/providers/VenuesProvider";
import { KhEventsProvider } from "src/app/services/providers/KhEventsProvider";
import { SingerPerformancesProvider } from "src/app/services/providers/SingerPerformancesProvider";
import { SongSearchProvider } from "src/app/services/providers/SongSearchProvider";
import { MockQueuedSongsProvider } from "src/app/services/providers/Mock/MockQueuedSongsProvider";
import { MockQueuedSingersProvider } from "./services/providers/Mock/MockQueuedSingersProvider";
import { MockSongsProvider } from "src/app/services/providers/Mock/MockSongsProvider";
import { MockSingersProvider } from "src/app/services/providers/Mock/MockSingersProvider";
import { MockVenuesProvider } from "src/app/services/providers/Mock/MockVenuesProvider";
import { MockSongSearchProvider } from "src/app/services/providers/Mock/MockSongSearchProvider";
import { MockSingerPerformanceProvider } from "src/app/services/providers/Mock/MockSingerPerformancesProvider";
import { MockKhEventsProvider } from "src/app/services/providers/Mock/MockKhEventsProvider";
import { LocalStorageService } from "./services/local-storage.service";
import { KaraokeManagerComponent } from './components/karaoke-manager/karaoke-manager.component';
import { AddSingerComponent } from './components/karaoke-manager/add-singer/add-singer.component';
import { PerformanceControlsComponent } from './components/karaoke-manager/performance-controls/performance-controls.component';
import { QueuedSingersComponent } from './components/karaoke-manager/queued-singers/queued-singers.component';
import { QueuedSongsComponent } from './components/karaoke-manager/queued-songs/queued-songs.component';
import { SingerPerformanceHistoryComponent } from './components/karaoke-manager/singer-performance-history/singer-performance-history.component';
import { SongSearchComponent } from './components/karaoke-manager/song-search/song-search.component';
import { DownloadsManagerComponent } from './components/downloads-manager/downloads-manager.component';
import { SettingsManagerComponent } from './components/settings-manager/settings-manager.component';
import { SingersManagerComponent } from './components/singers-manager/singers-manager.component';
import { SongsManagerComponent } from './components/songs-manager/songs-manager.component';
import { VenuesManagerComponent } from './components/venues-manager/venues-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // KaraokeManager
    KaraokeManagerComponent,
    AddSingerComponent,
    PerformanceControlsComponent,
    QueuedSingersComponent,
    QueuedSongsComponent,
    SingerPerformanceHistoryComponent,
    SongSearchComponent,
    // DownloadsManager
    DownloadsManagerComponent,
    // SettingsManager
    SettingsManagerComponent,
    // SingersManager
    SingersManagerComponent,
    // SongsManager
    SongsManagerComponent,
    // VenuesManager
    VenuesManagerComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Angular Material Modules
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    // Angular CDK
    DragDropModule,
    // kHost Modules
    KommonModule
  ],
  providers: [
    LocalStorageService,
    [{ provide: QueuedSongsProvider, useClass: MockQueuedSongsProvider }],
    [{ provide: QueuedSingersProvider, useClass: MockQueuedSingersProvider }],
    [{ provide: SongsProvider, useClass: MockSongsProvider }],
    [{ provide: SingersProvider, useClass: MockSingersProvider }],
    [{ provide: VenuesProvider, useClass: MockVenuesProvider }],
    [{ provide: KhEventsProvider, useClass: MockKhEventsProvider }],
    [{ provide: SingerPerformancesProvider, useClass: MockSingerPerformanceProvider}],
    [{ provide: SongSearchProvider, useClass: MockSongSearchProvider}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }