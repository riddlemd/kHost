import { SongSearchEngine } from "../models/SongSearchEngine";
import { SongSearchResult } from "../models/SongSearchResult";

export class SongSearchProvider {

    constructor() {
        
    }

    search(query: string, songSearchEngine: SongSearchEngine, count: number = 20, offset: number = 0): Promise<SongSearchResult[]> {
        throw ("Not Implemented");
    }

    convertToLocalSong(songSearchResult: SongSearchResult): Promise<void> {
        throw ("Not Implemented");
    }

    convertToRemoteSong(songSearchResult: SongSearchResult): Promise<void> {
        throw ("Not Implemented");
    }

    getSongSearchEngines(): Promise<SongSearchEngine[]> {
        throw ("Not Implemented");
    }
}