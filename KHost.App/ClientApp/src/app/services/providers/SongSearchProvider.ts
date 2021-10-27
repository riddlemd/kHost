import { Song } from "src/app/models/Song";
import { SongSearchEngine } from "src/app/models/SongSearchEngine";
import { SongSearchResult } from "src/app/models/SongSearchResult";

export class SongSearchProvider {

    constructor() {
        
    }

    search(query: string, songSearchEngine: SongSearchEngine, count?: number, offset?: number): Promise<SongSearchResult[]> {
        throw ("Not Implemented");
    }

    getSong(songSearchResult: SongSearchResult): Promise<Song | undefined> {
        throw ("Not Implemented");
    }

    getSongSearchEngines(): Promise<SongSearchEngine[]> {
        throw ("Not Implemented");
    }
}