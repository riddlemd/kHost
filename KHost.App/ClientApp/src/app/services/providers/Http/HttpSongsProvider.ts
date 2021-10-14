import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { Song } from 'src/app/models/Song';
import { SongsProvider } from '../SongsProvider';

@Injectable()
export class HttpSongsProvider implements SongsProvider {
    private static readonly ENDPOINT:string = "/api/songs";
    
    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }
    
    async search(query: string, count?: number, offset?: number): Promise<Song[]> {
        throw new Error('Method not implemented.');
    }

    async getByIds(ids: number[]): Promise<Song[]> {
        const url = `${this._config.apiUrl}${HttpSongsProvider.ENDPOINT}/get-by-ids`;

        const options: any = {
            params: {
                ids: ids.join(',')
            }
        };

        try {
            const response: any = await this._httpClient.get<Song[]>(url, options).toPromise();
            const songs = response?.songs;
            
            return songs;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    async create(song: Song): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async update(singer: Song): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async read(count?: number, offset?: number): Promise<Song[]> {
        throw new Error('Method not implemented.');
    }

    async delete(song: Song): Promise<void> {
        throw new Error('Method not implemented.');
    }
}