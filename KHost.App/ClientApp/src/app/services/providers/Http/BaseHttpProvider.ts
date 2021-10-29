import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { AppConfig } from "src/app/app.config";
import { ApiResponse } from "src/app/models/ApiResponse";
import { ModelWithId } from "src/app/models/ModelWIthId";

export abstract class BaseHttpProvider<TModel extends ModelWithId> {
        
    protected _created = new Subject<TModel>();

    protected _updated = new Subject<TModel>();

    protected _deleted = new Subject<TModel>();

    constructor(
        protected readonly _endpoint: string,
        protected readonly _config: AppConfig,
        protected readonly _httpClient: HttpClient
    ) {
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
        const url = this._getFullEndpointUrl('/create');

        try {
            const response = await this._httpClient.post<ApiResponse<TModel>>(url, entity).toPromise();

            this._created.next(response.result);

            return response.result.id!;
        }
        catch(exception) {
            throw("Unable to Create");
        }
    }

    async read(count?: number, offset?: number): Promise<TModel[]> {
        const url = this._getFullEndpointUrl('/read');

        const options: any = { params: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<TModel[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return [];
    }

    async update(entity: TModel): Promise<void> {
        const url = this._getFullEndpointUrl('/update');

        try {
            await this._httpClient.post(url, entity).toPromise();
            this._updated.next(entity);
        }
        catch(exception) {
            throw("Unable to Update");
        }
    }

    async delete(entity: TModel): Promise<void> {
        const url = this._getFullEndpointUrl('/delete');

        try {
            await this._httpClient.post(url, entity).toPromise();
            this._deleted.next(entity);
        }
        catch(exception) {
            throw("Unable to Delete");
        }
    }

    protected _getFullEndpointUrl(action?: string): string {
        return this._config.apiUrl + this._endpoint + (action ? action : '');
    }
}
