import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    async getByIds(ids: number[]): Promise<Song[]> {
        const url = `${this._config.apiUrl}${HttpSongsProvider.ENDPOINT}/get-by-ids`;

        const options: any = {
            params: {
                ids: ids.join(',')
            }
        };

        try {
            const response: any = await this._httpClient.get(url, options).toPromise();
            const songs = response?.songs;
            
            return songs;
        }
        catch(exception) {

        }

        return [];
    }

    async search(query: string, count?: number, offset?: number): Promise<Song[]> {
        const url = `${this._config.apiUrl}${HttpSongsProvider.ENDPOINT}/search`;

        const options: any = {
            params: {
                query: query
            }
        };

        try {
            const response: any = await this._httpClient.get(url, options).toPromise();
            const songs = response?.songs;
            
            return songs;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    async create(song: Song): Promise<number> {
        const url = `${this._config.apiUrl}${HttpSongsProvider.ENDPOINT}/create`;

        try {
            const response: any = await this._httpClient.post(url, song).toPromise();
            const id: number = response?.id;

            return id;
        }
        catch(exception) {
            throw("Unable to Create Song");
        }
    }

    async read(count?: number, offset?: number): Promise<Song[]> {
        const url = `${this._config.apiUrl}${HttpSongsProvider.ENDPOINT}/read`;

        const options: any = {
            params: {}
        };

        try {
            const response: any = await this._httpClient.get(url, options).toPromise();
            const songs = response?.songs;
            
            return songs;
        }
        catch(exception) {

        }

        return [];
    }

    async update(song: Song): Promise<void> {
        const url = `${this._config.apiUrl}${HttpSongsProvider.ENDPOINT}/update`;

        try {
            await this._httpClient.post(url, song).toPromise();
        }
        catch(exception) {
            throw("Unable to Update Song");
        }
    }

    async delete(song: Song): Promise<void> {
        const url = `${this._config.apiUrl}${HttpSongsProvider.ENDPOINT}/delete`;

        try {
            await this._httpClient.post(url, song).toPromise();
        }
        catch(exception) {
            throw("Unable to Delete Song");
        }
    }
}