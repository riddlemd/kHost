import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { ApiResponse } from "src/app/models/ApiResponse";
import { Singer } from "src/app/models/Singer";
import { SingerPerformance } from "src/app/models/SingerPerformance";
import { SingerPerformancesProvider } from "../SingerPerformancesProvider";

@Injectable()
export class HttpSingerPerformancesProvider implements SingerPerformancesProvider {

    private static readonly ENDPOINT:string = "/api/singer-performances";

    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    async findBySinger(singer: Singer, count?: number, offset?: number): Promise<SingerPerformance[]> {
        const url = `${this._config.apiUrl}${HttpSingerPerformancesProvider.ENDPOINT}/find-by-singer-id`;

        const options: any = {
            params: {
                id: singer.id
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<SingerPerformance[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    async create(singerPerformance: SingerPerformance): Promise<number> {
        const url = `${this._config.apiUrl}${HttpSingerPerformancesProvider.ENDPOINT}/create`;

        try {
            const response = await this._httpClient.post<ApiResponse<SingerPerformance>>(url, singerPerformance).toPromise();
            const id = response.result.id!;

            return id;
        }
        catch(exception) {
            throw("Unable to Create SingerPerformance");
        }
    }

    async read(count?: number, offset?: number): Promise<SingerPerformance[]> {
        const url = `${this._config.apiUrl}${HttpSingerPerformancesProvider.ENDPOINT}/read`;

        const options: any = { params: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<SingerPerformance[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {
            throw("Unable to read SingerPerformances");
        }
    }

    async update(singerPerformance: SingerPerformance): Promise<void> {
        const url = `${this._config.apiUrl}${HttpSingerPerformancesProvider.ENDPOINT}/update`;

        try {
            await this._httpClient.post(url, singerPerformance).toPromise();
        }
        catch(exception) {
            throw("Unable to Update SingerPerformance");
        }
    }
    
    async delete(singerPerformance: SingerPerformance): Promise<void> {
        const url = `${this._config.apiUrl}${HttpSingerPerformancesProvider.ENDPOINT}/delete`;

        try {
            await this._httpClient.post(url, singerPerformance).toPromise();
        }
        catch(exception) {
            throw("Unable to Delete SingerPerformance");
        }
    }
}