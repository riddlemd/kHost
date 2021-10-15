import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
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
    
    async search(query: string, count?: number, offset?: number): Promise<Venue[]> {
        throw new Error('Method not implemented.');
    }

    async getByIds(ids: number[]): Promise<Venue[]> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/get-by-ids`;

        const options: any = {
            params: {
                ids: ids.join(',')
            }
        };

        try {
            const response: any = await this._httpClient.get<Venue[]>(url, options).toPromise();
            const venues = response?.venues;
            
            return venues;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    async create(venue: Venue): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async update(venue: Venue): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async read(venue?: number, offset?: number): Promise<Venue[]> {
        const url = `${this._config.apiUrl}${HttpVenuesProvider.ENDPOINT}/read`;

        const options: any = {
            params: {}
        };

        try {
            const response: any = await this._httpClient.get<Venue[]>(url, options).toPromise();
            const venues = response?.venues;
            
            return venues;
        }
        catch(exception) {

        }

        return [];
    }

    async delete(venue: Venue): Promise<void> {
        throw new Error('Method not implemented.');
    }
}