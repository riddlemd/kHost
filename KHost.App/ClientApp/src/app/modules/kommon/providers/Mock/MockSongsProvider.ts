import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Song, SongState } from "../../models/Song";
import { SongsProvider } from "../SongsProvider";

@Injectable()
export class MockSongsProvider extends SongsProvider {

    private _cache: Song[] = [];

    constructor() {
        super();

        this._cache = this._generateSongs();
    }

    get(count: number = 20, offset: number = 0): Observable<Song[]> {
        let songs:Song[] = [...this._cache];
        return of(songs);
    }

    getBySingerId(id: number, count: number = 20, offset: number = 0): Observable<Song[]> {
        return this.get(count, offset);
    }

    search(query: string, count: number = 20, offset: number = 0) {
        return of(this._cache.filter(s => s.name.substring(0, query.length) === query));
    }

    private _generateSongs(): Song[] {
        let songs:Song[] = [];

        for(var i = 0; i < 100; i++)
        {
            let source = i % 2 ? 'local' : 'youtube';
            
            let song = new Song();
            song.id = i;
            song.name = (Math.random() + 1).toString(36).substring(7) + ' ' + source;
            song.bandName = (Math.random() + 1).toString(36).substring(7);
            song.source = source;
            song.localPath = i % 2 ? 'local://' : null;
            song.remotePath = i % 2 ? null : 'remote://';
            song.state = SongState.Ready;
            song.lengthInSeconds = Math.random() * 360;

            songs.push(song);
        }

        return songs;
    }
}
