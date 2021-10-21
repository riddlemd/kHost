import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { Singer } from 'src/app/models/Singer';
import { QueuedSingersProvider } from '../QueuedSingersProvider';

@Injectable()
export class HttpQueuedSingersProvider implements QueuedSingersProvider {
    private static readonly ENDPOINT:string = "/api/queued-singers";
    
    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient
    ) {
        
    }

    // CRUD Methods

    async create(queuedSinger: QueuedSinger): Promise<number> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/create`;

        try {
            const response = await this._httpClient.post<ApiResponse<QueuedSinger>>(url, queuedSinger).toPromise();
            const id: number = response.result.id ?? -1;

            return id;
        }
        catch(exception) {
            throw("Unable to Create QueuedSinger");
        }
    }

    async read(count?: number, offset?: number): Promise<QueuedSinger[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/read`;

        const options: any = { params: {}, headers: {} };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<QueuedSinger[]>>(url, <object>options).toPromise();
            const queuedSingers: QueuedSinger[] = response.result;

            return queuedSingers;
        }
        catch(exception) {
            throw("Unable to Read QueuedSingers");
        }
    }

    async update(queuedSinger: QueuedSinger): Promise<void> {
        // This provider is not expected to implement this.
        throw new Error('Method not implemented.');
    }
    
    async delete(queuedSinger: QueuedSinger): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/delete`;

        try {
            await this._httpClient.post(url, queuedSinger).toPromise();
        }
        catch(exception) {
            throw("Unable to Delete QueuedSinger");
        }
    }

    // Queue Methods

    async moveToTop(queuedSinger: QueuedSinger): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/move-to-top`;

        const data = {
            id: queuedSinger.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }

    async moveToBottom(queuedSinger: QueuedSinger): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/move-to-bottom`;
        
        const data = {
            id: queuedSinger.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {

        }
    }

    async moveUp(queuedSinger: QueuedSinger): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/move-up`;

        const data = {
            id: queuedSinger.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {

        }
    }

    async moveDown(queuedSinger: QueuedSinger): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/move-down`;

        const data = {
            id: queuedSinger.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }

    async moveBefore(beforeQueuedSinger: QueuedSinger, queuedSinger: QueuedSinger): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/move-before`;

        const data = {
            beforeId: beforeQueuedSinger?.id,
            id: queuedSinger?.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }
}