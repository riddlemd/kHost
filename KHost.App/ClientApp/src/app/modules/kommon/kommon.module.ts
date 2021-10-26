// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiButtonComponent } from './components/multi-button/multi-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SecondsToMinutesPipe } from './pipes/SecondsToMinutesPipe';
import { EnumToArrayPipe } from './pipes/enumToArrayPipe';
// Components



@NgModule({
  declarations: [
    MultiButtonComponent,
    SecondsToMinutesPipe,
    EnumToArrayPipe
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    MultiButtonComponent,
    SecondsToMinutesPipe,
    EnumToArrayPipe
  ]
})
export class KommonModule { }
