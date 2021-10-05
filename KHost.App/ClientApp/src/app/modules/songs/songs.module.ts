// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
// Components
import { SongsManagerComponent } from './songs-manager.component';


@NgModule({
  declarations: [
    SongsManagerComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class SongsModule { }