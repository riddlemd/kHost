import { Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseModel } from "src/app/models/BaseModel";

export abstract class EditModelComponent<TModel extends BaseModel, TComponent> {
  
  protected _entity: TModel;

  protected _form: FormGroup;
  get form(): FormGroup { return this._form; }

  constructor(
    private _dialogRef: MatDialogRef<TComponent>,
    @Inject(MAT_DIALOG_DATA) data: {
       entity: TModel
    }
  ) {
    this._entity = data.entity ?? this._createNewEntity();

    this._form = this._createFormGroup(data.entity);
  }

  protected abstract _createNewEntity(): TModel;

  protected abstract _createFormGroup(entity: TModel): FormGroup;

  public isNew(): boolean {
    return this._entity.id === undefined;
  }

  public async save(): Promise<void> {
    Object.keys(this.form.controls).forEach(key => {
      const control = this._form.controls[key];
      this._entity[key as keyof TModel] = control.value;
    });

    this._dialogRef.close(this._entity);
  } 
}
