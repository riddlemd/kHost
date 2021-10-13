import { Injectable } from "@angular/core";
import { Song, SongState } from "src/app/models/Song";
import { SongsProvider } from "../SongsProvider";

@Injectable()
export class MockSongsProvider implements SongsProvider {

    private _cache: Song[] = [];

    constructor() {
        this._generateSongs();
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

    // CRUD Methods

    create(song: Song): Promise<number> {
        throw new Error("Method not implemented.");
    }

    update(singer: Song): Promise<void> {
        throw new Error("Method not implemented.");
    }

    read(count?: number, offset?: number): Promise<Song[]> {
        console.info(`Reading Songs (Count:${count}, Offset:${offset})`);

        const songs = this._cache
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(songs);
        });
    }

    delete(song: Song): Promise<void> {
        throw new Error("Method not implemented.");
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
