export class TableColumn<TModel> {
    name: string = "";

    displayName: string | null = null;
    
    cell: (model: TModel) => string = () => { return "" };
  }