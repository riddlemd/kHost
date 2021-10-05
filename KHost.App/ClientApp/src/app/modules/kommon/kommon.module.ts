// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiButtonComponent } from './components/multi-button/multi-button.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SecondsToMinutesPipe } from './pipes/SecondsToMinutesPipe';
// Components



@NgModule({
  declarations: [
    MultiButtonComponent,
    SecondsToMinutesPipe
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    MultiButtonComponent,
    SecondsToMinutesPipe
  ]
})
export class KommonModule { }
