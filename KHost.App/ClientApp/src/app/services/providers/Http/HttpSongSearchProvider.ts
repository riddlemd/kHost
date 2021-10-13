import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { SongSearchEngine } from "src/app/models/SongSearchEngine";
import { SongSearchResult } from "src/app/models/SongSearchResult";
import { SongSearchProvider } from "../SongSearchProvider";

@Injectable()
export class HttpSongSearchProvider extends SongSearchProvider {

    private static endpointPath = '/api/song-search';

    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        super();
    }

    async search(query: string, songSearchEngine: SongSearchEngine, count: number = 20, offset: number = 0): Promise<SongSearchResult[]> {
        const url = `${this._config.apiUrl}${HttpSongSearchProvider.endpointPath}/search`;

        const params = {
            query: query,
            engine: songSearchEngine.name,
            count: count,
            offset: offset
        };

        const options = {
            params: params
        };

        try {
            const response: any = await this._httpClient.get(url, options).toPromise();
            const songSearchResults: SongSearchResult[] = response?.songSearchResults;
            return songSearchResults;
        } catch (e) {
            // Do nothing.
        }

        return [];
    }

    convertToLocalSong(songSearchResult: SongSearchResult): Promise<void> {
        throw ("Not Implemented");
    }

    convertToRemoteSong(songSearchResult: SongSearchResult): Promise<void> {
        throw ("Not Implemented");
    }

    async getSongSearchEngines(): Promise<SongSearchEngine[]> {
        const url = `${this._config.apiUrl}${HttpSongSearchProvider.endpointPath}/get-song-search-engines`;

        try {
            const response: any = await this._httpClient.get(url).toPromise();
            const songSearchEngines: SongSearchEngine[] = response?.songSearchEngines;

            return songSearchEngines;
        } catch (e) {
            // Do nothing.
        }

        return [];
    }
}