import { Injectable } from "@angular/core";
import { Song, SongState } from "../../models/Song";
import { SongsProvider } from "../SongsProvider";

@Injectable()
export class MockSongsProvider extends SongsProvider {

    private _cache: Song[] = [];

    constructor() {
        super();

        this._generateSongs();
    }

    get(count: number = 20, offset: number = 0): Promise<Song[]> {
        console.info(`Getting Songs (Count:${count}, Offset:${offset})`);

        const songs = this._cache
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(songs);
        });
    }

    search(query: string, count: number = 20, offset: number = 0): Promise<Song[]> {
        console.info(`Searching Songs (Query:"${query}", Count:${count}, Offset:${offset})`);

        const songs = this._cache
            .filter(s => s.name.substring(0, query.length) === query)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(songs);
        });
    }

    private async _generateSongs(): Promise<void> {
        console.info(`Generating Songs`);
        
        this._cache = [];

        for(var i = 0; i < 100; i++)
        {
            const source = i % 2 ? 'local' : 'youtube';
            
            const song = new Song();
            song.id = i;
            song.name = (Math.random() + 1).toString(36).substring(7) + ' ' + source;
            song.bandName = (Math.random() + 1).toString(36).substring(7);
            song.source = source;
            song.localPath = i % 2 ? 'local://' : null;
            song.remotePath = i % 2 ? null : 'remote://';
            song.state = SongState.Ready;
            song.lengthInSeconds = Math.random() * 360;

            this._cache.push(song);
        }
    }
}
