import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from '../VenuesProvider';

@Injectable()
export class HttpVenuesProvider implements VenuesProvider {
    private static readonly ENDPOINT:string = "/api/venues";
    
    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    async getByIds(ids: number[]): Promise<Venue[]> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/get-by-ids`;

        const options: any = {
            params: {
                ids: ids.join(',')
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<Venue[]>>(url, <object>options).toPromise();
            const venues = response.result;
            
            return venues;
        }
        catch(exception) {

        }

        return [];
    }

    async search(query: string, count?: number, offset?: number): Promise<Venue[]> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/search`;

        const options: any = {
            params: {
                query: query
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<Venue[]>>(url, <object>options).toPromise();
            const venues = response.result;
            
            return venues;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    async create(venue: Venue): Promise<number> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/create`;

        try {
            const response = await this._httpClient.post<ApiResponse<Venue>>(url, venue).toPromise();
            const id: number = response.result.id ?? -1;

            return id;
        }
        catch(exception) {
            throw("Unable to Create Song");
        }
    }

    async read(venue?: number, offset?: number): Promise<Venue[]> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/read`;

        const options: any = {
            params: {}
        };

        try {
            const response = await this._httpClient.get<ApiResponse<Venue[]>>(url, <object>options).toPromise();
            const venues = response.result;
            
            return venues;
        }
        catch(exception) {

        }

        return [];
    }

    async update(venue: Venue): Promise<void> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/update`;

        try {
            await this._httpClient.post(url, venue).toPromise();
        }
        catch(exception) {
            throw("Unable to Update Venue");
        }
    }

    async delete(venue: Venue): Promise<void> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/delete`;

        try {
            await this._httpClient.post(url, venue).toPromise();
        }
        catch(exception) {
            throw("Unable to Delete Venue");
        }
    }
}