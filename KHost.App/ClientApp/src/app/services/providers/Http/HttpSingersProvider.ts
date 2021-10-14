import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
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

    async getById(id: number): Promise<Singer | null> {
        throw new Error("Method not implemented.");
    }

    async getByIds(ids: number[]): Promise<Singer[]> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/get-by-ids`;

        const options: any = {
            params: {
                ids: ids.join(',')
            }
        };

        try {
            const response: any = await this._httpClient.get<Singer[]>(url, options).toPromise();
            const singers = response?.singers;

            return singers;
        }
        catch(exception) {

        }

        return [];
    }

    async search(query: string, venue?: Venue, count?: number, offset?: number): Promise<Singer[]> {
        throw new Error("Method not implemented.");
    }

    // CRUD Methods

    async create(singer: Singer): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async read(count?: number, offset?: number): Promise<Singer[]> {
        const url = `${this._config.apiUrl}${HttpSingersProvider.ENDPOINT}/read`;

        const options: any = { params: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response: any = await this._httpClient.get<Singer[]>(url, options).toPromise();
            const singers = response?.singers;

            return singers;
        }
        catch(exception) {

        }

        return [];
    }

    async update(singer: Singer): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(singer: Singer): Promise<void> {
        throw new Error("Method not implemented.");
    }
}