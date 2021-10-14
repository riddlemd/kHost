import { SongSearchEngine } from "src/app/models/SongSearchEngine";
import { SongSearchResult } from "src/app/models/SongSearchResult";
import { SongSearchProvider } from "../SongSearchProvider";

export class MockSongSearchProvider implements SongSearchProvider {
    
    constructor() {
        
    }

    async search(query: string, songSearchEngine: SongSearchEngine, count: number = 20, offset: number = 0): Promise<SongSearchResult[]> {
        const songSearchResults = (await this._generateSongSearchResults(songSearchEngine))
            .filter(s => s.songName.substring(0, query.length) === query)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(songSearchResults);
        });
    }

    getSongSearchEngines(): Promise<SongSearchEngine[]> {
        const songSearchEngines = [
            new SongSearchEngine({name:"local", displayName:"Local"}),
            new SongSearchEngine({name:"youtube", displayName:"YouTube", isLocal:false, allowDownload:true}),
            new SongSearchEngine({name:"karafun", displayName:"KaraFun", isLocal:false, allowDownload:true})
        ];

        return new Promise((resolve, reject) => {
            resolve(songSearchEngines);
        });
    }

    private async _generateSongSearchResults(songSearchEngine: SongSearchEngine): Promise<SongSearchResult[]> {
        const songSearchResults: SongSearchResult[] = [];

        for(let i = 1; i < 30; i++) {
            const songSearchResult = new SongSearchResult({
                id: i.toString(),
                songName: (Math.random() + 1).toString(36).substring(7),
                bandName: (Math.random() + 1).toString(36).substring(7),
                engineName: songSearchEngine.name,
                lengthInSeconds: Math.random() * 360
            });

            songSearchResults.push(songSearchResult);
        }

        return songSearchResults;
    }
}