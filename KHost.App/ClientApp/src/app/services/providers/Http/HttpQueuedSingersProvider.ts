import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSingersProvider } from '../QueuedSingersProvider';
import { BaseHttpProvider } from './BaseHttpProvider';
import { QueueProviderComponent } from './components/QueueProviderComponent';

@Injectable()
export class HttpQueuedSingersProvider extends BaseHttpProvider<QueuedSinger> implements QueuedSingersProvider {
    
    private _queue: QueueProviderComponent<QueuedSinger>;
    
    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/queued-singers", config, httpClient);
        
        this._queue = new QueueProviderComponent<QueuedSinger>(this._getFullEndpointUrl(), httpClient);
    }

    // Events

    created: Observable<QueuedSinger> = this._created.asObservable();
    
    deleted: Observable<QueuedSinger> = this._deleted.asObservable();

    // CRUD Methods

    update(queuedSinger: QueuedSinger): Promise<void> {
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