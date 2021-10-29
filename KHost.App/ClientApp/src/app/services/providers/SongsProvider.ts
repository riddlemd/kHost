import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/Song';
import { CrudProvider } from './CrudProvider';

@Injectable()
export abstract class SongsProvider implements CrudProvider<Song> {

    search(query: string, count?: number, offset?: number): Promise<Song[]> {
        throw ("Not Implemented");
    }

    findById(id: number): Promise<Song | undefined> {
        throw("Not Implemented");
    }

    findByIds(ids: number[]): Promise<Song[]> {
        throw("Not Implemented");
    }

    // Events

    created: Observable<Song> = (() => { throw("Not Implemented") })();

    updated: Observable<Song> = (() => { throw("Not Implemented") })();
    
    deleted: Observable<Song> = (() => { throw("Not Implemented") })();

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
