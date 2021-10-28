import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  private _title: string;
  get title():string { return this._title; }

  private _message: string;
  get message():string { return this._message; }

  constructor(
    private _dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
      title: string
      message: string
    }
  ) {
    this._title = data.title;
    this._message = data.message;
  }

  public confirm(): void {
    this._dialogRef.close(true);
  }

  public cancel(): void {
    this._dialogRef.close(false);
  }
}
