import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

    private _localStorage: Storage;

    constructor() {
        this._localStorage = localStorage;
    }

    write(key: string, data: any): void {
        const jsonData = JSON.stringify(data);

        this._localStorage.setItem(key, jsonData);
    }

    read<T>(key: string): T | null  {
        const jsonData = this._localStorage.getItem(key);

        const data = jsonData !== null ? JSON.parse(jsonData) as T : null;

        return data;
    }

    remove(key: string): void {
        this._localStorage.removeItem(key);
    }

    clearAll(): void {
        this._localStorage.clear();
    }
}
