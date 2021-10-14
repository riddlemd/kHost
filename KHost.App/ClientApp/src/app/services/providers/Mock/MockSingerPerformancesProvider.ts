import 'src/app/modules/kommon/chrono/DateExtensions';
import 'src/app/modules/kommon/mathematics/MathExtensions';
import { Singer } from "src/app/models/Singer";
import { SingerPerformance } from "src/app/models/SingerPerformance";
import { SingerPerformancesProvider } from "../SingerPerformancesProvider";
import { Injectable } from "@angular/core";
import { SingersProvider } from "../SingersProvider";
import { SongsProvider } from '../SongsProvider';
import { VenuesProvider } from '../VenuesProvider';

@Injectable()
export class MockSingerPerformanceProvider implements SingerPerformancesProvider {
    private _cache: SingerPerformance[] = [];

    constructor(
        private _singersProvider: SingersProvider,
        private _songsProvider: SongsProvider,
        private _venuesProvider: VenuesProvider
    ) {
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

        const songs = await this._songsProvider.read();

        const venues = await this._venuesProvider.read();

        for(let singer of singers) {
            if(!singer.id) return;

            const maxPerformanceCount = Math.random() * 30;

            for(let i = 0; i < maxPerformanceCount; i++) {

                const song = songs[Math.randomBetween(1, songs.length)];

                if(!song.id) continue;

                const venue = venues[Math.randomBetween(1, venues.length)];

                if(!venue.id) continue;

                const singerPerformance = new SingerPerformance({
                    id: i,
                    singerId: singer.id,
                    songId: song.id,
                    venueId: venue.id,
                    date: Date.getRandomBetween(new Date(0), new Date())
                });
    
                this._cache.push(singerPerformance);
            }    
        }
    }
}