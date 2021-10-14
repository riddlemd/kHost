import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
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
            const response: any = await this._httpClient.get(url, options).toPromise();
            const songSearchResults: SongSearchResult[] = response?.songSearchResults;
            
            return songSearchResults;
        } catch (exception) {
            
        }

        return [];
    }

    async getSongSearchEngines(): Promise<SongSearchEngine[]> {
        const url = `${this._config.apiUrl}${HttpSongSearchProvider.endpointPath}/get-song-search-engines`;

        try {
            const response: any = await this._httpClient.get(url).toPromise();
            const songSearchEngines: SongSearchEngine[] = response?.songSearchEngines;

            return songSearchEngines;
        } catch (exception) {
            
        }

        return [];
    }
}