import "./modules/kommon/collections/arrayExtensions";
// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KaraokeModule } from "./modules/karaoke/karaoke.module";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { SongsModule } from "./modules/songs/songs.module";
import { SingersModule } from "./modules/singers/singers.module";
import { SettingsModule } from "./modules/settings/settings.module";
import { VenuesModule } from "./modules/venues/venues.module";
// Components
import { AppComponent } from './app.component';
// Providers
import { QueuedSongsProvider } from "./modules/karaoke/providers/QueuedSongsProvider";
import { QueuedSingersProvider } from "./modules/karaoke/providers/QueuedSingersProvider";
import { SongsProvider } from "./modules/kommon/providers/SongsProvider";
import { SingersProvider } from "./modules/kommon/providers/SingersProvider";
import { VenuesProvider } from "./modules/kommon/providers/VenuesProvider";
import { MockQueuedSongsProvider } from "./modules/karaoke/providers/Mock/MockQueuedSongsProvider";
import { MockQueuedSingersProvider } from "./modules/karaoke/providers/Mock/MockQueuedSingersProvider";
import { MockSongsProvider } from "./modules/kommon/providers/Mock/MockSongsProvider";
import { MockSingersProvider } from "./modules/kommon/providers/Mock/MockSingersProvider";
import { MockVenuesProvider } from "./modules/kommon/providers/Mock/MockVenuesProvider";
import { KhEventsProvider } from "./modules/kommon/providers/KhEventsProvider";
import { MockKhEventsProvider } from "./modules/kommon/providers/Mock/MockKhEventsProvider";
import { SingerPerformancesProvider } from "./modules/kommon/providers/SingerPerformancesProvider";
import { MockSingerPerformanceProvider } from "./modules/kommon/providers/Mock/MockSingerPerformancesProvider";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KaraokeModule,
    SongsModule,
    SingersModule,
    SettingsModule,
    VenuesModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    [{ provide: QueuedSongsProvider, useClass: MockQueuedSongsProvider }],
    [{ provide: QueuedSingersProvider, useClass: MockQueuedSingersProvider }],
    [{ provide: SongsProvider, useClass: MockSongsProvider }],
    [{ provide: SingersProvider, useClass: MockSingersProvider }],
    [{ provide: VenuesProvider, useClass: MockVenuesProvider }],
    [{ provide: KhEventsProvider, useClass: MockKhEventsProvider }],
    [{ provide: SingerPerformancesProvider, useClass: MockSingerPerformanceProvider}]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }