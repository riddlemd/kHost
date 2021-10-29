import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { QueuedSongsProvider } from '../QueuedSongsProvider';
import { BaseHttpProvider } from './BaseHttpProvider';
import { QueueProviderComponent } from './components/QueueProviderComponent';

@Injectable()
export class HttpQueuedSongsProvider extends BaseHttpProvider<QueuedSong> implements QueuedSongsProvider {
    
    private _queue: QueueProviderComponent<QueuedSong>;

    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/queued-songs", config, httpClient);

        this._queue = new QueueProviderComponent<QueuedSong>(this._getFullEndpointUrl(), httpClient);
    }

    async getByQueuedSinger(queuedSinger: QueuedSinger, count?: number, offset?: number): Promise<QueuedSong[]> {
        const url = this._getFullEndpointUrl('/find-by-queued-singer-id');

        const options: any = {
            params: {
                id: queuedSinger.id
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<QueuedSong[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return [];
    }

    // CRUD Methods

    update(queuedSong: QueuedSong): Promise<void> {
        // This provider is not expected to implement this.
        throw new Error('Method not implemented.');
    }

    // Queue Methods

    async moveToTop(queuedSinger: QueuedSinger): Promise<number> {
        return await this._queue.moveToTop(queuedSinger);
    }

    async moveToBottom(queuedSinger: QueuedSinger): Promise<number> {
        return await this._queue.moveToBottom(queuedSinger);
    }

    async moveUp(queuedSinger: QueuedSinger): Promise<number> {
        return await this._queue.moveUp(queuedSinger);
    }

    async moveDown(queuedSinger: QueuedSinger): Promise<number> {
        return await this._queue.moveDown(queuedSinger);
    }

    async moveTo(queuedSinger: QueuedSinger, position: number): Promise<number> {
        return await this._queue.moveTo(queuedSinger, position);
    }
}