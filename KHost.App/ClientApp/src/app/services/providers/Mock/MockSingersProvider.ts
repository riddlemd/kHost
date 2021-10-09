import { Injectable } from "@angular/core";
import { Venue } from "src/app/models/Venue";
import { Singer } from "src/app/models/Singer";
import { SingersProvider } from "../SingersProvider";

@Injectable()
export class MockSingersProvider extends SingersProvider {
    
    private _cache: Singer[] = [];

    constructor() {
        super();

        this._generateSingers();
    }

    get(count: number = 20, offset: number = 0): Promise<Singer[]> {
        console.info(`Getting Singers (Count:${count}, Offset:${offset})`);

        const singers = this._cache
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(singers);
        });
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

    search(query: string, venue: Venue|null = null, count: number = 20, offset: number = 0): Promise<Singer[]> {
        console.info(`Searching Singers (Query:"${query}", Count:${count}, Offset:${offset})`);

        const singers = this._cache
            .filter(s => s.name.substring(0, query.length) === query)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(singers);
        });
    }

    private async _generateSingers(): Promise<void> {
        console.info(`Generating Singers`);
        
        this._cache = []

        for(var i = 0; i < 100; i++)
        {
            const singer = new Singer();
            singer.id = i;
            singer.name = (Math.random() + 1).toString(36).substring(7);

            this._cache.push(singer);
        }
    }
}
