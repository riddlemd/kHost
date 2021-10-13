import { SongSearchEngine } from "src/app/models/SongSearchEngine";
import { SongSearchResult } from "src/app/models/SongSearchResult";
import { SongSearchProvider } from "../SongSearchProvider";

export class MockSongSearchProvider extends SongSearchProvider {
    constructor() {
        super();
    }

    async search(query: string, songSearchEngine: SongSearchEngine, count: number = 20, offset: number = 0): Promise<SongSearchResult[]> {
        const songSearchResults = (await this._generateSongSearchResults(songSearchEngine))
            .filter(s => s.songName.substring(0, query.length) === query)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(songSearchResults);
        });
    }

    convertToLocalSong(songSearchResult: SongSearchResult): Promise<void> {
        throw ("Not Implemented");
    }

    convertToRemoteSong(songSearchResult: SongSearchResult): Promise<void> {
        throw ("Not Implemented");
    }

    getSongSearchEngines(): Promise<SongSearchEngine[]> {
        const songSearchEngines = [
            new SongSearchEngine("local", "Local"),
            new SongSearchEngine("youtube", "YouTube", false, true),
            new SongSearchEngine("karafun", "KaraFun", false, true)
        ];

        return new Promise((resolve, reject) => {
            resolve(songSearchEngines);
        });
    }

    private async _generateSongSearchResults(songSearchEngine: SongSearchEngine): Promise<SongSearchResult[]> {
        const songSearchResults: SongSearchResult[] = [];

        for(let i = 1; i < 30; i++) {
            const songSearchResult = new SongSearchResult();
            songSearchResult.id = i.toString();
            songSearchResult.songName = (Math.random() + 1).toString(36).substring(7);
            songSearchResult.bandName = (Math.random() + 1).toString(36).substring(7);
            songSearchResult.engineName = songSearchEngine.name;
            songSearchResult.lengthInSeconds = Math.random() * 360;

            songSearchResults.push(songSearchResult);
        }

        return songSearchResults;
    }
}