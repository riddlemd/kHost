import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Singer } from 'src/app/models/Singer';
import { SingersProvider } from 'src/app/services/providers/SingersProvider';
import { Venue } from 'src/app/models/Venue';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'kh-add-singer',
  templateUrl: './add-singer.component.html',
  styleUrls: ['./add-singer.component.scss']
})
export class AddSingerComponent {

  @Input()
  currentVenue?: Venue;
  
  @Output()
  selectSingerChange = new EventEmitter<Singer | undefined>();

  private _singers?: Singer[]
  get singers() { return this._singers };

  private _queryControl = new FormControl();
  get queryControl() { return this._queryControl; }

  selectedSinger?: Singer;

  constructor(
    private _dialogRef: MatDialogRef<AddSingerComponent>,
    private _singersProvider: SingersProvider
  ) {

  }

  async search(): Promise<void> {
    this._singers = undefined;

    if(!this.queryControl.value) return;

    this._singers = [];

    this._singers = await this._singersProvider.search(this.queryControl.value);
  }

  async returnNewSinger(): Promise<void> {
    const newSinger = new Singer();
    newSinger.name = this.queryControl.value;

    newSinger.id = await this._singersProvider.create(newSinger);

    this._dialogRef.close(newSinger);
  }

  returnSelectedSinger(): void {
    this._dialogRef.close(this.selectedSinger);
  }
}
