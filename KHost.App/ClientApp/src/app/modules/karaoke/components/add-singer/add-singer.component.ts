import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Singer } from 'src/app/modules/kommon/models/Singer';
import { SingersProvider } from 'src/app/modules/kommon/providers/SingersProvider';
import { Venue } from 'src/app/modules/kommon/models/Venue';

@Component({
  selector: 'kh-add-singer',
  templateUrl: './add-singer.component.html',
  styleUrls: ['./add-singer.component.scss']
})
export class AddSingerComponent {

  @Input()
  currentVenue: Venue|null = null;
  
  @Output()
  selectSingerChange = new EventEmitter<Singer|null>();

  singers: Singer[]|null = null;

  selectedSinger: Singer|null = null;

  queryControl = new FormControl("");

  constructor(private _singersProvider: SingersProvider) {

  }

  search(): void {
    this.singers = [];
    if(this.queryControl.value) {
      this._singersProvider.search(this.queryControl.value)
        .then(value => { this.singers = value; });
    }
  }

  createSinger(): void {

  }
}
