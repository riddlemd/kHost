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
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// Angular CDK
import { DragDropModule } from '@angular/cdk/drag-drop';
// kHost Modules
import { KommonModule } from './modules/kommon/kommon.module';
import { AuthModule } from './modules/auth/auth.module';
// Services
import { LocalStorageService } from "./services/local-storage.service";
import { AuthService } from './modules/auth/services/auth.service';
// Providers
import { QueuedSongsProvider } from "src/app/services/providers/QueuedSongsProvider";
import { QueuedSingersProvider } from "./services/providers/QueuedSingersProvider";
import { SongsProvider } from "src/app/services/providers/SongsProvider";
import { SingersProvider } from "src/app/services/providers/SingersProvider";
import { VenuesProvider } from "src/app/services/providers/VenuesProvider";
import { SingerPerformancesProvider } from "src/app/services/providers/SingerPerformancesProvider";
import { SongSearchProvider } from "src/app/services/providers/SongSearchProvider";
// Http Providers
import { HttpSongSearchProvider } from './services/providers/http/HttpSongSearchProvider';
import { HttpQueuedSingersProvider } from './services/providers/http/HttpQueuedSingersProvider';
import { HttpQueuedSongsProvider } from './services/providers/http/HttpQueuedSongsProvider';
import { HttpSongsProvider } from './services/providers/http/HttpSongsProvider';
import { HttpSingersProvider } from './services/providers/http/HttpSingersProvider';
import { HttpVenuesProvider } from './services/providers/http/HttpVenuesProvider';
import { HttpSingerPerformancesProvider } from './services/providers/http/HttpSingerPerformancesProvider';
import { HttpDownloadsProvider } from './services/providers/http/HttpDownloadsProvider';
// Configs
import { AppConfig, AppConfigInstance } from './app.config';
// Components
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HeaderComponent } from './components/header/header.component';
// Components.Pages
import { LoginComponent } from "./components/pages/login/login.component";
import { KaraokeManagerComponent } from './components/pages/karaoke-manager/karaoke-manager.component';
import { PerformanceControlsComponent } from './components/pages/karaoke-manager/performance-controls/performance-controls.component';
import { QueuedSingersComponent } from './components/pages/karaoke-manager/queued-singers/queued-singers.component';
import { QueuedSongsComponent } from './components/pages/karaoke-manager/queued-songs/queued-songs.component';
import { SingerPerformanceHistoryComponent } from './components/dialogs/singer-performance-history/singer-performance-history.component';
import { SongSearchComponent } from './components/pages/karaoke-manager/song-search/song-search.component';
import { DownloadsManagerComponent } from './components/pages/downloads-manager/downloads-manager.component';
import { SettingsManagerComponent } from './components/pages/settings-manager/settings-manager.component';
import { SingersManagerComponent } from './components/pages/singers-manager/singers-manager.component';
import { SongsManagerComponent } from './components/pages/songs-manager/songs-manager.component';
import { VenuesManagerComponent } from './components/pages/venues-manager/venues-manager.component';
import { NotAuthorizedComponent } from './components/pages/not-authorized/not-authorized.component';
// Components.Dialogs
import { AddSingerComponent } from './components/dialogs/add-singer/add-singer.component';
import { EditVenueComponent } from './components/dialogs/edit-venue/edit-venue.component';
import { ConfirmComponent } from './components/dialogs/confirm/confirm.component';
import { EditSongComponent } from './components/dialogs/edit-song/edit-song.component';
import { EditSingerComponent } from './components/dialogs/edit-singer/edit-singer.component';
import { DownloadsProvider } from './services/providers/DownloadsProvider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotAuthorizedComponent,
    MainMenuComponent,
    HeaderComponent,
    // Dialogs
    AddSingerComponent,
    EditSongComponent,
    EditVenueComponent,
    ConfirmComponent,
    EditSingerComponent,
    SingerPerformanceHistoryComponent,
    // Pages
    // Pages.KaraokeManager
    KaraokeManagerComponent,
    PerformanceControlsComponent,
    QueuedSingersComponent,
    QueuedSongsComponent,
    SongSearchComponent,
    // Pages.DownloadsManager
    DownloadsManagerComponent,
    // Pages.SettingsManager
    SettingsManagerComponent,
    // Pages.SingersManager
    SingersManagerComponent,
    // Pages.SongsManager
    SongsManagerComponent,
    // Pages.VenuesManager
    VenuesManagerComponent,
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
    MatSelectModule,
    MatOptionModule,
    // Angular CDK
    DragDropModule,
    // kHost Modules
    KommonModule,
    AuthModule
  ],
  providers: [
    { provide: AppConfig, useValue: AppConfigInstance },
    LocalStorageService,
    AuthService,
    [{ provide: QueuedSongsProvider, useClass: HttpQueuedSongsProvider }],
    [{ provide: QueuedSingersProvider, useClass: HttpQueuedSingersProvider }],
    [{ provide: SongsProvider, useClass: HttpSongsProvider }],
    [{ provide: SingersProvider, useClass: HttpSingersProvider }],
    [{ provide: SongSearchProvider, useClass: HttpSongSearchProvider }],
    [{ provide: VenuesProvider, useClass: HttpVenuesProvider }],
    [{ provide: SingerPerformancesProvider, useClass: HttpSingerPerformancesProvider }],
    [{ provide: DownloadsProvider, useClass: HttpDownloadsProvider }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }