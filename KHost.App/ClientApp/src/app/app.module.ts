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
// kHost Modules
import { KaraokeModule } from "./modules/karaoke/karaoke.module";
import { SongsModule } from "./modules/songs/songs.module";
import { SingersModule } from "./modules/singers/singers.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { VenuesModule } from "./modules/venues/venues.module";
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from "./components/login/login.component";
// Providers
import { QueuedSongsProvider } from "./modules/karaoke/providers/QueuedSongsProvider";
import { QueuedSingersProvider } from "./modules/karaoke/providers/QueuedSingersProvider";
import { SongsProvider } from "src/app/services/providers/SongsProvider";
import { SingersProvider } from "src/app/services/providers/SingersProvider";
import { VenuesProvider } from "src/app/services/providers/VenuesProvider";
import { KhEventsProvider } from "src/app/services/providers/KhEventsProvider";
import { SingerPerformancesProvider } from "src/app/services/providers/SingerPerformancesProvider";
import { SongSearchProvider } from "./modules/karaoke/providers/SongSearchProvider";
import { MockQueuedSongsProvider } from "./modules/karaoke/providers/Mock/MockQueuedSongsProvider";
import { MockQueuedSingersProvider } from "./modules/karaoke/providers/Mock/MockQueuedSingersProvider";
import { MockSongsProvider } from "src/app/services/providers/Mock/MockSongsProvider";
import { MockSingersProvider } from "src/app/services/providers/Mock/MockSingersProvider";
import { MockVenuesProvider } from "src/app/services/providers/Mock/MockVenuesProvider";
import { MockSongSearchProvider } from "./modules/karaoke/providers/Mock/MockSongSearchProvider";
import { MockSingerPerformanceProvider } from "src/app/services/providers/Mock/MockSingerPerformancesProvider";
import { MockKhEventsProvider } from "src/app/services/providers/Mock/MockKhEventsProvider";
import { LocalStorageService } from "./services/local-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    // kHost Modules
    KaraokeModule,
    SongsModule,
    SingersModule,
    SettingsModule,
    VenuesModule
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