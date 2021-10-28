import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Song } from 'src/app/models/Song';
import { SongsProvider } from '../SongsProvider';
import { BaseHttpProvider } from './BaseHttpProvider';

@Injectable()
export class HttpSongsProvider extends BaseHttpProvider<Song> implements SongsProvider {
    
    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/songs", config, httpClient);
    }

    async search(query: string, count?: number, offset?: number): Promise<Song[]> {
        const url = this._getFullEndpointUrl('/search');

        const options: any = {
            params: {
                query: query
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<Song[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return [];
    }
}
