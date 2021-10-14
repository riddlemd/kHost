export class TableColumn<TModel> {
    name: string = "";

    displayName?: string;
    
    cell: (model: TModel) => string = () => { return "" };
  }