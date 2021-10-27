import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { QueuedSongsProvider } from '../QueuedSongsProvider';

@Injectable()
export class HttpQueuedSongsProvider implements QueuedSongsProvider {
    
    private static readonly ENDPOINT:string = "/api/queued-songs";
    
    private _created = new Subject<QueuedSong>();

    private _deleted = new Subject<QueuedSong>();

    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    async getByQueuedSinger(queuedSinger: QueuedSinger, count?: number, offset?: number): Promise<QueuedSong[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/find-by-queued-singer-id`;

        const options: any = {
            params: {
                id: queuedSinger.id
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<QueuedSong[]>>(url, <object>options).toPromise();
            const queuedSongs = response.result;

            return queuedSongs;
        }
        catch(exception) {

        }

        return [];
    }

    // Events

    created: Observable<QueuedSong> = this._created.asObservable();
    
    deleted: Observable<QueuedSong> = this._deleted.asObservable();

    // CRUD Methods

    async create(queuedSong: QueuedSong): Promise<number> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/create`;

        try {
            const response = await this._httpClient.post<ApiResponse<QueuedSong>>(url, queuedSong).toPromise();
            queuedSong.id = response.result.id ?? -1;

            this._created.next(queuedSong)

            return queuedSong.id;
        }
        catch(exception) {
            throw("Unable to Create QueuedSong");
        }
    }

    async read(count?: number, offset?: number): Promise<QueuedSong[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/read`;

        const options: any = { params: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<QueuedSong[]>>(url, <object>options).toPromise();
            const queuedSongs: QueuedSong[] = response.result;

            return queuedSongs;
        }
        catch(exception) {

        }

        return [];
    }

    async update(queuedSong: QueuedSong): Promise<void> {
        // This provider is not expected to implement this.
        throw new Error('Method not implemented.');
    }
    
    async delete(queuedSong: QueuedSong): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/delete`;

        try {
            await this._httpClient.post(url, queuedSong).toPromise();

            this._deleted.next(queuedSong);
        }
        catch(exception) {
            throw("Unable to Delete QueuedSong");
        }
    }

    // Queue Methods

    async moveToTop(queuedSong: QueuedSong): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/move-to-top`;

        const data = {
            id: queuedSong.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {

        }
    }

    async moveToBottom(queuedSong: QueuedSong): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/move-to-bottom`;

        const data = {
            id: queuedSong.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {

        }
    }

    async moveUp(queuedSong: QueuedSong): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/move-up`;

        const data = {
            id: queuedSong.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {

        }
    }

    async moveDown(queuedSong: QueuedSong): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/move-down`;

        const data = {
            id: queuedSong.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {

        }
    }

    async moveTo(queuedSong: QueuedSong, position: number): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/move-to`;

        const data = {
            id: queuedSong?.id,
            position: position
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }
}