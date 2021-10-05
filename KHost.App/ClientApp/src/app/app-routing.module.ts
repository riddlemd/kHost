import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KaraokeManagerComponent } from './modules/karaoke/karaoke-manager.component';
import { SettingsManagerComponent } from './modules/settings/settings-manager.component';
import { SingersManagerComponent } from './modules/singers/singers-manager.component';
import { SongsManagerComponent } from './modules/songs/songs-manager.component';
import { VenuesManagerComponent } from './modules/venues/venues-manager.component';

const routes: Routes = [
  { path: '', component: KaraokeManagerComponent },
  { path: 'singers', component: SingersManagerComponent },
  { path: 'songs', component: SongsManagerComponent },
  { path: 'venues', component: VenuesManagerComponent},
  { path: 'settings', component: SettingsManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
