import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Venue } from 'src/app/models/Venue';
import { VenuesProvider } from '../VenuesProvider';
import { BaseHttpProvider } from './BaseHttpProvider';

@Injectable()
export class HttpVenuesProvider extends BaseHttpProvider<Venue> implements VenuesProvider {

    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/venues", config, httpClient);
    }

    async search(query: string, count?: number, offset?: number): Promise<Venue[]> {
        const url = this._getFullEndpointUrl('/search');

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
}
