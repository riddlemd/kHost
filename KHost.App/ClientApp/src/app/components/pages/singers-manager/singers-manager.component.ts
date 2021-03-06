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

  private _searching: boolean = false;
  get searching() { return this._searching; }

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
    this._searching = true;

    this._singers = await this._singersProvider.read();

    this._searching = false;
  }

  async search(): Promise<void> {
    const query = this.form.get("query")?.value;

    this._singers = [];

    if(query) {
      this._searching = true;

      this._singers = await this._singersProvider.search(query);

      this._searching = false;

      return;
    }

    this.getAll();
  }

  async openEditSingerDialog(singer?: Singer): Promise<void> {
    const isNew = singer === undefined;

    const config = {
      data: {
        entity: singer
      },
      minWidth: '50vw'
    };

    const dialogRef = this._dialog.open(EditSingerComponent, config);

    singer = await dialogRef.afterClosed().toPromise();

    if(!singer) return;
          
    if(!isNew) return;

    this._singers.push(singer);
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

    const confirm = await dialogRef.afterClosed().toPromise();
    
    if(!confirm) return;

    await this._singersProvider.delete(singer);
    
    this._singers.remove(singer);
  }
}
