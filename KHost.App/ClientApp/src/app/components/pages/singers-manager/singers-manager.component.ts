import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Singer } from 'src/app/models/Singer';
import { SingersProvider } from 'src/app/services/providers/SingersProvider';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { EditSingerComponent } from '../../dialogs/edit-singer/edit-singer.component';

@Component({
  templateUrl: './singers-manager.component.html',
  styleUrls: ['./singers-manager.component.scss']
})
export class SingersManagerComponent implements OnInit {

  private _singers: Singer[] = [];
  get singers(): Singer[] { return this._singers; }

  private _form: FormGroup;
  get form(): FormGroup { return this._form; }

  selectedSinger?: Singer;

  constructor(
    private _singersProvider: SingersProvider,
    private _dialog: MatDialog
  ) {
    this._form = new FormGroup({
      'query': new FormControl(undefined, Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(): Promise<void> {
    this._singersProvider.read()
      .then(value => { this._singers = value; });
  }

  async search(): Promise<void> {
    const query = this.form.get("query")?.value;

    if(query) {
      this._singersProvider.search(query)
        .then(value => { this._singers = value; });
      return;
    }

    this.getAll();
  }

  async openEditSingerDialog(singer?: Singer): Promise<void> {
    const isNew = singer === undefined;

    const config = {
      data: {
        entity: singer
      }
    };

    const dialogRef = this._dialog.open(EditSingerComponent, config);

    dialogRef
      .afterClosed()
        .subscribe(singer => {
          if(!singer) return;

          singer.id
            ? this._singersProvider.update(singer)
            : this._singersProvider.create(singer);

          if(!isNew) return;

          this._singers.push(singer);
    });
  }

  async openDeleteSingerDialog(singer: Singer): Promise<void> {
    if(singer.id === 1) return;

    const config = {
      data: {
        title: 'Delete Singer',
        message: `Are you sure you want to delete ${singer.name}?`
      }
    };

    const dialogRef = this._dialog.open(ConfirmComponent, config);

    dialogRef
      .afterClosed()
        .subscribe(async confirm => {
          if(!confirm) return;

          await this._singersProvider.delete(singer);
          this._singers.remove(singer);
    });
  }
}
