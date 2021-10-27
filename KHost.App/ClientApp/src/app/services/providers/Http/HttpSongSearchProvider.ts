import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { ApiResponse } from "src/app/models/ApiResponse";
import { Song } from "src/app/models/Song";
import { SongSearchEngine } from "src/app/models/SongSearchEngine";
import { SongSearchResult } from "src/app/models/SongSearchResult";
import { SongSearchProvider } from "../SongSearchProvider";

@Injectable()
export class HttpSongSearchProvider implements SongSearchProvider {

    private static endpointPath = '/api/song-search';

    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    async search(query: string, songSearchEngine: SongSearchEngine, count?: number, offset?: number): Promise<SongSearchResult[]> {
        const url = `${this._config.apiUrl}${HttpSongSearchProvider.endpointPath}/search`;

        const options: any = {
            params: {
                query: query,
                engine: songSearchEngine.name
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<SongSearchResult[]>>(url, <object>options).toPromise();
            const songSearchResults: SongSearchResult[] = response.result;
            
            return songSearchResults;
        } catch (exception) {
            
        }

        return [];
    }

    async getSong(songSearchResult: SongSearchResult): Promise<Song | undefined> {
        const url = `${this._config.apiUrl}${HttpSongSearchProvider.endpointPath}/get-song`;

        const options: any = {
            params: {
                id: songSearchResult.id,
                engine: songSearchResult.engineName
            }
        };

        try {
            const response = await this._httpClient.get<ApiResponse<Song>>(url, <object>options).toPromise();
            return response.result;
        } catch (exception) {
            
        }

        return undefined;
    }

    async getSongSearchEngines(): Promise<SongSearchEngine[]> {
        const url = `${this._config.apiUrl}${HttpSongSearchProvider.endpointPath}/get-song-search-engines`;

        try {
            const response = await this._httpClient.get<ApiResponse<SongSearchEngine[]>>(url).toPromise();
            const songSearchEngines: SongSearchEngine[] = response.result;

            return songSearchEngines;
        } catch (exception) {
            
        }

        return [];
    }
}