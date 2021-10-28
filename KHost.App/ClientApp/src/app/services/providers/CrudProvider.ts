import { ModelWithId } from "src/app/models/ModelWIthId";

export interface CurdProvider<TModel extends ModelWithId> {
    
    create(entity: TModel): Promise<number>;

    read(count?: number, offset?: number): Promise<TModel[]>;

    update(entity: TModel): Promise<void>;
    
    delete(entity: TModel): Promise<void>;
}