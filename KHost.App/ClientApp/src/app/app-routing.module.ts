import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { DownloadsManagerComponent } from './components/pages/downloads-manager/downloads-manager.component';
import { KaraokeManagerComponent } from './components/pages/karaoke-manager/karaoke-manager.component';
import { SettingsManagerComponent } from './components/pages/settings-manager/settings-manager.component';
import { SingersManagerComponent } from './components/pages/singers-manager/singers-manager.component';
import { SongsManagerComponent } from './components/pages/songs-manager/songs-manager.component';
import { VenuesManagerComponent } from './components/pages/venues-manager/venues-manager.component';
import { AuthGuardService } from './modules/auth/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: KaraokeManagerComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'singers', component: SingersManagerComponent, canActivate: [AuthGuardService] },
  { path: 'songs', component: SongsManagerComponent, canActivate: [AuthGuardService] },
  { path: 'venues', component: VenuesManagerComponent, canActivate: [AuthGuardService]},
  { path: 'settings', component: SettingsManagerComponent, canActivate: [AuthGuardService]},
  { path: 'downloads', component: DownloadsManagerComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
