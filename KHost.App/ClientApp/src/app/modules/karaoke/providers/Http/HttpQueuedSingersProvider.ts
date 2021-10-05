import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueuedSinger } from '../../models/QueuedSinger';
import { Singer } from '../../../kommon/models/Singer';

@Injectable()
export class HttpQueuedSingersProvider {
    private endpoint:string = "/api/queued-singers";
    
    constructor(private _httpClient: HttpClient) {

    }

    get(count: number = 20, offset: number = 0): Observable<QueuedSinger[]> {
        return this._httpClient.get<QueuedSinger[]>(this.endpoint + "/get-all");
    }

    remove(queuedSinger: QueuedSinger): Observable<boolean> {
        return this._httpClient.post<boolean>(this.endpoint + "/remove", {id:queuedSinger.id});
    }

    add(singer: Singer): Observable<QueuedSinger> {
        return this._httpClient.post<QueuedSinger>(this.endpoint + "/get", {singerId:singer.id});
    }
}