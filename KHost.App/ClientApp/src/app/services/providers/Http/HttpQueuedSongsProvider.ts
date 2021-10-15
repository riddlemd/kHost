import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { QueuedSongsProvider } from '../QueuedSongsProvider';

@Injectable()
export class HttpQueuedSongsProvider implements QueuedSongsProvider {
    private static readonly ENDPOINT:string = "/api/queued-songs";
    
    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    async getByQueuedSinger(queuedSinger: QueuedSinger, count?: number, offset?: number): Promise<QueuedSong[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/get-by-queued-singer-id`;

        const options: any = {
            params: {
                id: queuedSinger.id
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response: any = await this._httpClient.get(url, options).toPromise();
            const queuedSongs = response?.queuedSongs;

            return queuedSongs;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    async create(queuedSong: QueuedSong): Promise<number> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/create`;

        try {
            const response: any = await this._httpClient.get(url).toPromise();
            const id: number = response?.id;

            return id;
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
            const response: any = await this._httpClient.get(url, options).toPromise();
            const queuedSongs: QueuedSong[] = response?.queuedSongs;

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

    async moveBefore(beforeQueuedSong: QueuedSong, queuedSong: QueuedSong): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSongsProvider.ENDPOINT}/move-before`;

        const data = {
            beforeId: beforeQueuedSong.id,
            id: queuedSong.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }
}