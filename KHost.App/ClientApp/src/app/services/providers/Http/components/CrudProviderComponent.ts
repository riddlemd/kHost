import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "src/app/models/ApiResponse";
import { ModelWithId } from "src/app/models/ModelWIthId";

export class CrudProviderComponent<TModel extends ModelWithId> {
    
    constructor(
        private _endpoint: string,
        private _httpClient: HttpClient
    ) {

    }
    
    async create(entity: TModel): Promise<TModel> {
        const url = this._getFullEndpointUrl('/create');

        const response = await this._httpClient.post<ApiResponse<TModel>>(url, entity).toPromise();

        return response.result;
    }

    async read(count?: number, offset?: number): Promise<TModel[]> {
        const url = this._getFullEndpointUrl('/read');

        const options: any = { params: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        const response = await this._httpClient.get<ApiResponse<TModel[]>>(url, <object>options).toPromise();
        
        return response.result;
    }

    async update(entity: TModel): Promise<void> {
        const url = this._getFullEndpointUrl('/update');

        await this._httpClient.post<ApiResponse>(url, entity).toPromise();
    }

    async delete(entity: TModel): Promise<void> {
        const url = this._getFullEndpointUrl('/delete');

        await this._httpClient.post(url, entity).toPromise();
    }

    protected _getFullEndpointUrl(action?: string): string {
        return this._endpoint + action;
    }
}