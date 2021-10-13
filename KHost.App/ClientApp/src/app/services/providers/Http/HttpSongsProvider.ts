import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/Song';
import { SongsProvider } from '../SongsProvider';

@Injectable()
export class HttpSongsProvider implements SongsProvider {
    private endpoint:string = "/api/songs";
    
    constructor(
        private _httpClient: HttpClient
    ) {
        
    }
    
    async search(query: string, count?: number, offset?: number): Promise<Song[]> {
        throw new Error('Method not implemented.');
    }

    // CRUD Methods

    async create(song: Song): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async update(singer: Song): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async read(count?: number, offset?: number): Promise<Song[]> {
        throw new Error('Method not implemented.');
    }

    async delete(song: Song): Promise<void> {
        throw new Error('Method not implemented.');
    }
}