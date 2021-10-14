import { Injectable } from "@angular/core";
import { Venue } from "src/app/models/Venue";
import { Singer } from "src/app/models/Singer";
import { SingersProvider } from "../SingersProvider";

@Injectable()
export class MockSingersProvider implements SingersProvider {
    
    private _cache: Singer[] = [];

    constructor() {
        this._generateSingers();
    }

    getById(id: number): Promise<Singer|null> {
        console.info(`Getting Singer (Id:${id})`);

        let singerToReturn: Singer|null = null;

        for(let singer of this._cache) {
            if(singer.id !== id) continue;
            
            singerToReturn = singer;
            break;
        }

        return new Promise((resolve, reject) => {
            resolve(singerToReturn);
        });
    }

    getByIds(ids: number[]): Promise<Singer[]> {
        throw new Error("Method not implemented.");
    }

    search(query: string, venue: Venue|null = null, count: number = 20, offset: number = 0): Promise<Singer[]> {
        console.info(`Searching Singers (Query:"${query}", Count:${count}, Offset:${offset})`);

        const singers = this._cache
            .filter(s => s.name.substring(0, query.length) === query)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(singers);
        });
    }

    // CRUD Methods

    create(singer: Singer): Promise<number> {
        throw new Error("Method not implemented.");
    }

    read(count?: number, offset?: number): Promise<Singer[]> {
        console.info(`Getting Singers (Count:${count}, Offset:${offset})`);

        const queuedSongs = this._cache
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(queuedSongs);
        });
    }

    update(singer: Singer): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(singer: Singer): Promise<void> {
        console.info(`Deleting Singer#${singer.id}`);

        throw("Not Implemented");
    }

    private async _generateSingers(): Promise<void> {
        console.info(`Generating Singers`);
        
        this._cache = []

        for(var i = 0; i < 100; i++)
        {
            const singer = new Singer({
                id: i,
                name: (Math.random() + 1).toString(36).substring(7)
            });

            this._cache.push(singer);
        }
    }
}
