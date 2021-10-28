import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { QueuedSong } from 'src/app/models/QueuedSong';
import { QueuedSongsProvider } from '../QueuedSongsProvider';
import { BaseHttpProvider } from './BaseHttpProvider';

@Injectable()
export class HttpQueuedSongsProvider extends BaseHttpProvider<QueuedSong> implements QueuedSongsProvider {
    
    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/queued-songs", config, httpClient);
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

    async moveToTop(queuedSong: QueuedSong): Promise<void> {
        const url = this._getFullEndpointUrl('/move-to-top');

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
        const url = this._getFullEndpointUrl('/move-to-bottom');

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
        const url = this._getFullEndpointUrl('/move-up');

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
        const url = this._getFullEndpointUrl('/move-down');

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
        const url = this._getFullEndpointUrl('/move-to');

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