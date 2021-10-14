import { Injectable } from '@angular/core';
import { Song } from 'src/app/models/Song';

@Injectable()
export abstract class SongsProvider {

    search(query: string, count?: number, offset?: number): Promise<Song[]> {
        throw ("Not Implemented");
    }

    getByIds(ids: number[]): Promise<Song[]> {
        throw("Not Implemented");
    }

    // CRUD Methods

    create(song: Song): Promise<number> {
        throw("Not Implemented");
    }

    update(singer: Song): Promise<void> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<Song[]> {
        throw("Not Implemented");
    }

    delete(song: Song): Promise<void> {
        throw("Not Implemented");
    }
}