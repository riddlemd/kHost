import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../../../models/Song';

@Injectable()
export class HttpSongsProvider {
    private endpoint:string = "/api/songs";
    
    constructor(private _httpClient: HttpClient) {

    }

    getAll(): Observable<Song[]> {
        return this._httpClient.get<Song[]>(this.endpoint + "/get-all");
    }

    getBySingerId(id: number): Observable<Song[]> {
        return this._httpClient.post<Song[]>(this.endpoint + "/get", {singerId:id});
    }

    
}