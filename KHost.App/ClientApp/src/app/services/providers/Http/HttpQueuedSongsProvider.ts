import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

    private _moved = new Subject<QueuedSinger>();

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
    
    // Events

    moved: Observable<QueuedSinger> = this._moved.asObservable();

    // Queue Methods

    async moveToTop(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveToTop(queuedSinger);

        this._moved.next(queuedSinger);

        return position;
    }

    async moveToBottom(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveToBottom(queuedSinger);

        this._moved.next(queuedSinger);

        return position;
    }

    async moveUp(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveUp(queuedSinger);

        this._moved.next(queuedSinger);

        return position;
    }

    async moveDown(queuedSinger: QueuedSinger): Promise<number> {
        const position = await this._queue.moveDown(queuedSinger);

        this._moved.next(queuedSinger);

        return position;
    }

    async moveTo(queuedSinger: QueuedSinger, position: number): Promise<number> {
        const newPosition = await this._queue.moveTo(queuedSinger, position);

        this._moved.next(queuedSinger);

        return newPosition;
    }
}