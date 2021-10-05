import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenuesManagerComponent } from './venues-manager.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    VenuesManagerComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class VenuesModule { }
