import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
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

    async create(singer: Singer): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async read(count?: number, offset?: number): Promise<QueuedSinger[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/read`;

        try {
            const response: any = await this._httpClient.get<QueuedSinger[]>(url).toPromise();
            const queuedSingers: QueuedSinger[] = response?.queuedSingers;

            return queuedSingers;
        }
        catch(exception) {
            throw("Unable to get QueuedSingers");
        }
    }

    async update(singer: Singer): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    async delete(queuedSinger: QueuedSinger): Promise<void> {
        throw new Error('Method not implemented.');
    }

    // Queue Methods

    async moveToTop(queuedSinger: QueuedSinger): Promise<void> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.ENDPOINT}/move-to-top`;

        const data = {
            id: queuedSinger.id
        };

        try {
            const response: any = await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();
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
            await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();
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
            await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();
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
            await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }
}