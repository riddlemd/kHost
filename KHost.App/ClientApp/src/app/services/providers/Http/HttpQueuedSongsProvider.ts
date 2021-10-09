import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { Singer } from 'src/app/models/Singer';
import { Song } from 'src/app/models/Song';

@Injectable()
export class HttpQueuedSongsProvider {
    private endpoint:string = "/api/queued-songs";
    
    constructor(private _httpClient: HttpClient) {

    }

    get(count: number = 20, offset: number = 0): Observable<QueuedSong[]> {
        return this._httpClient.get<QueuedSong[]>(this.endpoint + "/get-all");
    }

    getBySinger(singer: Singer, count: number = 20, offset: number = 0): Observable<QueuedSong[]> {
        return this._httpClient.post<QueuedSong[]>(this.endpoint + "/get", {singerId:singer.id});
    }

    remove(queuedSong: QueuedSong): Observable<boolean> {
        return this._httpClient.post<boolean>(this.endpoint + "/remove", {id:queuedSong.id});
    }

    add(singer: Singer, song: Song): Observable<QueuedSong> {
        return this._httpClient.post<QueuedSong>(this.endpoint + "/add", {singerId: singer.id, songId: song.id});
    }
}