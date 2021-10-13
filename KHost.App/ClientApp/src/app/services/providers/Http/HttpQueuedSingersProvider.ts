import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { Singer } from 'src/app/models/Singer';

@Injectable()
export class HttpQueuedSingersProvider {
    private static endpoint:string = "/api/queued-singers";
    
    constructor(
        private _config: AppConfig,
        private _httpClient: HttpClient) {

    }

    async get(count: number = 20, offset: number = 0): Promise<QueuedSinger[]> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.endpoint}/read`;

        const response: any = await this._httpClient.get<QueuedSinger[]>(url).toPromise();
        const queuedSingers: QueuedSinger[] = response?.queuedSingers;

        return queuedSingers;
    }

    async remove(queuedSinger: QueuedSinger): Promise<boolean> {
        throw("Not Implemented");
    }

    async add(singer: Singer): Promise<QueuedSinger> {
        throw("Not Implemented");
    }

    async moveToTop(queuedSinger: QueuedSinger): Promise<boolean> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.endpoint}/move-to-top`;

        const data = {
            id: queuedSinger.id
        };

        const response: any = await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();

        return true;
    }

    async moveToBottom(queuedSinger: QueuedSinger): Promise<boolean> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.endpoint}/move-to-bottom`;

        const data = {
            id: queuedSinger.id
        };

        const response: any = await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();

        return true;
    }

    async moveUp(queuedSinger: QueuedSinger): Promise<boolean> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.endpoint}/move-up`;

        const data = {
            id: queuedSinger.id
        };

        const response: any = await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();

        return true;
    }

    async moveDown(queuedSinger: QueuedSinger): Promise<boolean> {
        const url = `${this._config.apiUrl}${HttpQueuedSingersProvider.endpoint}/move-down`;

        const data = {
            id: queuedSinger.id
        };

        const response: any = await this._httpClient.post<QueuedSinger[]>(url, data).toPromise();

        return true;
    }
}