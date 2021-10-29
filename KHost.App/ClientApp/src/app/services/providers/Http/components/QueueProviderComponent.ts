import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "src/app/models/ApiResponse";
import { ModelWithId } from "src/app/models/ModelWIthId";

export class QueueProviderComponent<TModel extends ModelWithId> {
    
    constructor(
        private _endpoint: string,
        private _httpClient: HttpClient
    ) {

    }

    async moveToTop(entity: TModel): Promise<number> {
        const url = this._getFullEndpointUrl('/move-to-top');

        const data = {
            id: entity.id
        };

        const response = await this._httpClient.post<ApiResponse<number>>(url, data).toPromise();

        return response.result;
    }

    async moveToBottom(entity: TModel): Promise<number> {
        const url = this._getFullEndpointUrl('/move-to-bottom');
        
        const data = {
            id: entity.id
        };

        const response = await this._httpClient.post<ApiResponse<number>>(url, data).toPromise();

        return response.result;
    }

    async moveUp(entity: TModel): Promise<number> {
        const url =  this._getFullEndpointUrl('/move-up');

        const data = {
            id: entity.id
        };

        const response = await this._httpClient.post<ApiResponse<number>>(url, data).toPromise();

        return response.result;
    }

    async moveDown(entity: TModel): Promise<number> {
        const url =  this._getFullEndpointUrl('/move-down');

        const data = {
            id: entity.id
        };

        const response = await this._httpClient.post<ApiResponse<number>>(url, data).toPromise();

        return response.result;
    }

    async moveTo(entity: TModel, position: number): Promise<number> {
        const url =  this._getFullEndpointUrl('/move-to');

        const data = {
            id: entity?.id,
            position: position
        };

        const response = await this._httpClient.post<ApiResponse<number>>(url, data).toPromise();

        return response.result;
    }

    protected _getFullEndpointUrl(action?: string): string {
        return this._endpoint + action;
    }
}