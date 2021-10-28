import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { QueuedSinger } from 'src/app/models/QueuedSinger';
import { Singer } from 'src/app/models/Singer';
import { QueuedSingersProvider } from '../QueuedSingersProvider';
import { BaseHttpProvider } from './BaseHttpProvider';

@Injectable()
export class HttpQueuedSingersProvider extends BaseHttpProvider<QueuedSinger> implements QueuedSingersProvider {
    
    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/queued-singers", config, httpClient);
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

    async moveToTop(queuedSinger: QueuedSinger): Promise<void> {
        const url = this._getFullEndpointUrl('/move-to-top');

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
        const url = this._getFullEndpointUrl('/move-to-bottom');
        
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
        const url =  this._getFullEndpointUrl('/move-up');

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
        const url =  this._getFullEndpointUrl('/move-down');

        const data = {
            id: queuedSinger.id
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }

    async moveTo(queuedSinger: QueuedSinger, position: number): Promise<void> {
        const url =  this._getFullEndpointUrl('/move-to');

        const data = {
            id: queuedSinger?.id,
            position: position
        };

        try {
            await this._httpClient.post(url, data).toPromise();
        }
        catch(exception) {
            
        }
    }
}