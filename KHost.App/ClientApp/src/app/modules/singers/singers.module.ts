import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingersManagerComponent } from './singers-manager.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SingersManagerComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class SingersModule { }
