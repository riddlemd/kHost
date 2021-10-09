import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DownloadsManagerComponent } from './components/downloads-manager/downloads-manager.component';
import { KaraokeManagerComponent } from './components/karaoke-manager/karaoke-manager.component';
import { SettingsManagerComponent } from './components/settings-manager/settings-manager.component';
import { SingersManagerComponent } from './components/singers-manager/singers-manager.component';
import { SongsManagerComponent } from './components/songs-manager/songs-manager.component';
import { VenuesManagerComponent } from './components/venues-manager/venues-manager.component';

const routes: Routes = [
  { path: '', component: KaraokeManagerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singers', component: SingersManagerComponent },
  { path: 'songs', component: SongsManagerComponent },
  { path: 'venues', component: VenuesManagerComponent},
  { path: 'settings', component: SettingsManagerComponent},
  { path: 'downloads', component: DownloadsManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
