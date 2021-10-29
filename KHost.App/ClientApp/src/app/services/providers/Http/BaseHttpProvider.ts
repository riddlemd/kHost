import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { AppConfig } from "src/app/app.config";
import { ApiResponse } from "src/app/models/ApiResponse";
import { ModelWithId } from "src/app/models/ModelWIthId";
import { CrudProviderComponent } from "./components/CrudProviderComponent";

export abstract class BaseHttpProvider<TModel extends ModelWithId> {
        
    protected _crud: CrudProviderComponent<TModel>;

    protected _created = new Subject<TModel>();

    protected _updated = new Subject<TModel>();

    protected _deleted = new Subject<TModel>();

    constructor(
        protected readonly _endpoint: string,
        protected readonly _config: AppConfig,
        protected readonly _httpClient: HttpClient
    ) {
        this._crud = new CrudProviderComponent<TModel>(this._getFullEndpointUrl(), this._httpClient);
    }

    async findById(id: number): Promise<TModel | undefined> {
        const url = this._getFullEndpointUrl('/find-by-id');

        const options: any = {
            params: {
                id: id
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<TModel>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return undefined;
    }

    async findByIds(ids: number[]): Promise<TModel[]> {
        const url = this._getFullEndpointUrl('/find-by-ids');

        const options: any = {
            params: {
                ids: ids.join(',')
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<TModel[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return [];
    }

    // Events

    created: Observable<TModel> = this._created.asObservable();
    
    updated: Observable<TModel> = this._updated.asObservable();

    deleted: Observable<TModel> = this._deleted.asObservable();

    // CRUD Methods

    async create(entity: TModel): Promise<number> {
        const newEntity = await this._crud.create(entity);

        this._created.next(newEntity);

        return newEntity.id!;
    }

    async read(count?: number, offset?: number): Promise<TModel[]> {
        return await this._crud.read(count, offset);
    }

    async update(entity: TModel): Promise<void> {
        await this._crud.update(entity);

        this._updated.next(entity);
    }

    async delete(entity: TModel): Promise<void> {
        await this._crud.delete(entity);

        this._deleted.next(entity);
    }

    protected _getFullEndpointUrl(action?: string): string {
        return this._config.apiUrl + this._endpoint + (action ? action : '');
    }
}
