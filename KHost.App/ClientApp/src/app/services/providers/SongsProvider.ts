import { Injectable } from '@angular/core';
import { Song } from '../../models/Song';

@Injectable()
export abstract class SongsProvider {

    get(count: number = 20, offset: number = 0): Promise<Song[]> {
        throw("Not Implemented");
    }

    getById(id:number): Promise<Song|null> {
        throw("Not Implemented");
    }

    search(query: string, count: number = 20, offset: number = 0): Promise<Song[]> {
        throw ("Not Implemented");
    } 
}