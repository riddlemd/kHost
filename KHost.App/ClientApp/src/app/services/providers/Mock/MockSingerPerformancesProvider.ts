import 'src/app/modules/kommon/chrono/DateExtensions';
import { Singer } from "src/app/models/Singer";
import { SingerPerformance } from "src/app/models/SingerPerformance";
import { SingerPerformancesProvider } from "../SingerPerformancesProvider";
import { Injectable } from "@angular/core";
import { SingersProvider } from "../SingersProvider";

@Injectable()
export class MockSingerPerformanceProvider implements SingerPerformancesProvider {
    private _cache: SingerPerformance[] = [];

    constructor(private _singersProvider: SingersProvider) {
        this._generateSingerPerformances();
    }

    async getBySinger(singer: Singer, count?: number, offset?: number): Promise<SingerPerformance[]> {
        console.info(`Getting SingerPerformances for Singer#${singer.id} (Count:${count}, Offset:${offset})`);
        
        const singerPerformances: SingerPerformance[] = this._cache
            .filter(sp => sp.singerId == singer.id)
            .slice(offset ?? 0, count ?? 20);

        singerPerformances.sort((a,b) => {
            const aTime = a.date?.getTime() ?? 0;
            const bTime = b.date?.getTime() ?? 0;
            return aTime > bTime ? 1 : -1
        });

        return new Promise<SingerPerformance[]>((resolve, reject) => {
            resolve(singerPerformances);
        });
    }

    // CRUD Methods

    create(singerPerformance: SingerPerformance): Promise<number> {
        throw new Error('Method not implemented.');
    }

    async read(count?: number, offset?: number): Promise<SingerPerformance[]> {
        console.info(`Getting SingerPerformances (Count:${count}, Offset:${offset})`);

        const songs = this._cache
            .slice(offset ?? 0, count ?? 20);

        return new Promise((resolve, reject) => {
            resolve(songs);
        });
    }

    update(singerPerformance: SingerPerformance): Promise<void> {
        throw new Error('Method not implemented.');
    }

    delete(singerPerformance: SingerPerformance): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private async _generateSingerPerformances(): Promise<void> {
        console.info(`Generating SingerPerformances`);
        
        this._cache = [];

        const singers = await this._singersProvider.read();

        for(let singer of singers) {
            const maxPerformanceCount = Math.random() * 30;

            for(let i = 0; i < maxPerformanceCount; i++) {
                const singerPerformance = new SingerPerformance();
                singerPerformance.id = i;
    
                singerPerformance.singerId = singer.id;
                singerPerformance.songId = Math.floor(Math.random() * 100);
                singerPerformance.venueId = Math.floor(Math.random() * 100);
                singerPerformance.date = Date.getRandomBetween(new Date(0), new Date());
    
                this._cache.push(singerPerformance);
            }    
        }
    }
}