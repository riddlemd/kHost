import { Inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModelWithId } from "src/app/models/ModelWIthId";
import { CrudProvider } from "src/app/services/providers/CrudProvider";

export abstract class EditModelComponent<TModel extends ModelWithId, TProvider extends CrudProvider<TModel>, TComponent> {
  
  protected _entity: TModel;

  protected _form: FormGroup;
  get form(): FormGroup { return this._form; }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {
       entity: TModel
    },
    private _provider: TProvider,
    private _dialogRef: MatDialogRef<TComponent>,
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
    if(!this._form.valid) return;

    Object.keys(this.form.controls).forEach(key => {
      const control = this._form.controls[key];
      this._entity[key as keyof TModel] = control.value;
    });

    this._entity.id
      ? this._provider.update(this._entity)
      : this._provider.create(this._entity);

    this._dialogRef.close(this._entity);
  } 
}
