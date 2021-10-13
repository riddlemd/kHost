import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { Singer } from 'src/app/models/Singer';
import { QueuedSongsProvider } from '../QueuedSongsProvider';

@Injectable()
export class HttpQueuedSongsProvider implements QueuedSongsProvider {
    private static readonly ENDPOINT:string = "/api/queued-songs";
    
    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    getBySinger(singer: Singer, count?: number, offset?: number): Promise<QueuedSong[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/get-by-singer-id`;

        const options: any = {
            params: {
                id: singer.id
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        const response: any = this._httpClient.get<QueuedSong[]>(url, options).toPromise();
        const queuedSongs = response?.queuedSongs;

        return queuedSongs;
    }

    // CRUD Methods

    async create(queuedSong: QueuedSong): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async read(count?: number, offset?: number): Promise<QueuedSong[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/read`;

        const options: any = { params: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response: any = this._httpClient.get<QueuedSong[]>(url, options).toPromise();
            const queuedSongs = response?.queuedSongs;

            return queuedSongs;
        }
        catch(exception) {

        }

        return [];
    }

    async update(queuedSong: QueuedSong): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async delete(queuedSinger: QueuedSong): Promise<void> {
        throw new Error('Method not implemented.');
    }

    // Queue Methods

    async moveToTop(queuedSong: QueuedSong): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/move-to-top`;

        const data = {
            id: queuedSong.id
        };

        try {
            const response: any = await this._httpClient.post<QueuedSong[]>(url, data).toPromise();
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
            const response: any = await this._httpClient.post<QueuedSong[]>(url, data).toPromise();
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
            const response: any = await this._httpClient.post<QueuedSong[]>(url, data).toPromise();
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
            const response: any = await this._httpClient.post<QueuedSong[]>(url, data).toPromise();
        }
        catch(exception) {

        }
    }
}