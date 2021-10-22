import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { ApiResponse } from "src/app/models/ApiResponse";
import { Singer } from "src/app/models/Singer";
import { Venue } from "src/app/models/Venue";
import { SingersProvider } from "../SingersProvider";

@Injectable()
export class HttpSingersProvider implements SingersProvider {
    
    private static readonly ENDPOINT:string = "/api/singers";
    
    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    async findById(id: number): Promise<Singer | undefined> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/find-by-id`;

        const options: any = {
            params: {
                id: id
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<Singer>>(url, <object>options).toPromise();
            const singer = response.result;

            return singer;
        }
        catch(exception) {

        }

        return undefined;
    }

    async findByIds(ids: number[]): Promise<Singer[]> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/find-by-ids`;

        const options: any = {
            params: {
                ids: ids.join(',')
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<Singer[]>>(url, <object>options).toPromise();
            const singers = response.result;

            return singers;
        }
        catch(exception) {

        }

        return [];
    }

    async search(query: string, venue?: Venue, count?: number, offset?: number): Promise<Singer[]> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/search`;

        const options: any = {
            params: {
                query: query
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<Singer[]>>(url, <object>options).toPromise();
            const singers = response.result;

            return singers;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    async create(singer: Singer): Promise<number> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/create`;

        try {
            const response = await this._httpClient.post<ApiResponse<Singer>>(url, singer).toPromise();
            const id: number = response.result.id ?? -1;

            return id;
        }
        catch(exception) {
            throw("Unable to Create Singer");
        }
    }

    async read(count?: number, offset?: number): Promise<Singer[]> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/read`;

        const options: any = { params: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<Singer[]>>(url, <object>options).toPromise();
            const singers = response.result;

            return singers;
        }
        catch(exception) {

        }

        return [];
    }

    async update(singer: Singer): Promise<void> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/update`;

        try {
            await this._httpClient.post(url, singer).toPromise();
        }
        catch(exception) {
            throw("Unable to Update Singer");
        }
    }

    async delete(singer: Singer): Promise<void> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/delete`;

        try {
            await this._httpClient.post(url, singer).toPromise();
        }
        catch(exception) {
            throw("Unable to Delete Singer");
        }
    }
}
