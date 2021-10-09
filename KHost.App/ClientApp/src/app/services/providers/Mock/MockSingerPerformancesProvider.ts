import 'src/app/modules/kommon/chrono/DateExtensions';
import { Singer } from "src/app/models/Singer";
import { SingerPerformance } from "src/app/models/SingerPerformance";
import { SingerPerformancesProvider } from "../SingerPerformancesProvider";
import { Injectable } from "@angular/core";
import { SingersProvider } from "../SingersProvider";

@Injectable()
export class MockSingerPerformanceProvider extends SingerPerformancesProvider {
    private _cache: SingerPerformance[] = [];

    constructor(private _singersProvider: SingersProvider) {
        super();

        this._generateSingerPerformances();
    }

    async get(count: number = 20, offset: number = 0): Promise<SingerPerformance[]> {
        console.info(`Getting SingerPerformances (Count:${count}, Offset:${offset})`);

        const songs = this._cache
            .slice(offset, count);

        return new Promise<SingerPerformance[]>((resolve, reject) => {
            resolve(songs);
        });
    }

    async getBySinger(singer: Singer, count: number = 20, offset: number = 0): Promise<SingerPerformance[]> {
        console.info(`Getting SingerPerformances for Singer#${singer.id} (Count:${count}, Offset:${offset})`);
        
        const singerPerformances: SingerPerformance[] = this._cache
            .filter(sp => sp.singerId == singer.id)
            .slice(offset, count);

        singerPerformances.sort((a,b) => {
            const aTime = a.date?.getTime() ?? 0;
            const bTime = b.date?.getTime() ?? 0;
            return aTime > bTime ? 1 : -1
        });

        return new Promise<SingerPerformance[]>((resolve, reject) => {
            resolve(singerPerformances);
        });
    }

    private async _generateSingerPerformances(): Promise<void> {
        console.info(`Generating SingerPerformances`);
        
        this._cache = [];

        const singers = await this._singersProvider.get();

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