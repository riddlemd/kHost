import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MultiButtonMode } from '../../models/MultiButtonMode';

@Component({
  selector: 'multi-button',
  templateUrl: './multi-button.component.html',
  styleUrls: ['./multi-button.component.scss']
})
export class MultiButtonComponent implements OnInit {
  @Input() prefix: string = '';
  @Input() postfix: string = '';
  @Input() modes: MultiButtonMode[] = [];
  @Input() get selectedMode(): MultiButtonMode { return this._selectedMode; }
  @Output() selectedModeChange = new EventEmitter<MultiButtonMode>();
  @Output() trigger = new EventEmitter<MultiButtonMode>();

  private _selectedMode: MultiButtonMode = this.modes[0];
  set selectedMode(value: MultiButtonMode) { 
    this._selectedMode = value;
    this.selectedModeChange.emit(value);
  }

  constructor() { }

  ngOnInit(): void {
    if(!this.selectedMode) {
      this.selectedMode = this.modes[0];
    }
  }
}
