import { Injectable } from "@angular/core";
import { SingersProvider } from "../SingersProvider";
import { SongsProvider } from "../SongsProvider";
import { QueuedSongsProvider } from "../QueuedSongsProvider";
import { QueuedSong } from "src/app/models/QueuedSong";
import { Singer } from "src/app/models/Singer";
import { Song } from "src/app/models/Song";
import "src/app/modules/kommon/mathematics/MathExtensions";
import { QueuedSinger } from "src/app/models/QueuedSinger";

@Injectable()
export class MockQueuedSongsProvider implements QueuedSongsProvider {
        
    private _cache: QueuedSong[] = [];

    constructor(
        private _singersProvider: SingersProvider,
        private _songsProvider: SongsProvider
    ) {
        this._generateQueuedSongs();
    }

    getByQueuedSinger(queuedSinger: QueuedSinger, count: number = 20, offset: number = 0): Promise<QueuedSong[]> {
        console.info(`Getting QueuedSongs for Singer#${queuedSinger.id} (Count:${count}, Offset:${offset})`);

        const queuedSongs = this._cache
            .filter(s => s.singerId == queuedSinger.id)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
           resolve(queuedSongs); 
        });
    }

    // CRUD Methods

    create(queuedSong: QueuedSong): Promise<number> {
        throw new Error("Method not implemented.");
    }

    read(count?: number, offset?: number): Promise<QueuedSong[]> {
        console.info(`Getting QueuedSongs (Count:${count}, Offset:${offset})`);

        const queuedSongs = this._cache
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(queuedSongs);
        });
    }

    update(queuedSong: QueuedSong): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(queuedSong: QueuedSong): Promise<void> {
        console.info(`Deleting QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        for(let i = 0; i < this._cache.length; i++) {
            if(this._cache[i].id !== queuedSong.id) continue;
            
            this._cache.splice(i, 1);

            return new Promise((resolve, reject) => { resolve(); });
        }

        return new Promise((resolve, reject) => { reject(); });
    }

    // Queue Methods

    moveToTop(queuedSong: QueuedSong): Promise<void> {
        console.info(`movedToTop QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        this._cache.moveToStart(queuedSong);
        
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveToBottom(queuedSong: QueuedSong): Promise<void> {
        console.info(`movedToBottom QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        this._cache.moveToEnd(queuedSong);
        
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveUp(queuedSong: QueuedSong): Promise<void> {
        console.info(`movedUp QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        this._cache.moveTowardStart(queuedSong);
        
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveDown(queuedSong: QueuedSong): Promise<void> {
        console.info(`movedDown QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);
        
        this._cache.moveTowardEnd(queuedSong);
        
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    moveBefore(beforeQueuedSong: QueuedSong, queuedSong: QueuedSong): Promise<void> {
        throw ("Not Implemented");
    }

    private async _generateQueuedSongs(): Promise<void> {
        console.info(`Generating QueuedSongs`);
        
        this._cache = [];

        const singers: Singer[] = await this._singersProvider.read();
        const songs: Song[] = await this._songsProvider.read();

        for(let singer of singers) {
            if(!singer.id) continue;
            
            const maxQueuedSongs = Math.random() * 11 - 1;

            for(let i = 1; i <= maxQueuedSongs; i++)
            {
                const song = songs[Math.randomBetween(0, songs.length - 1)];

                if(!song.id) continue;
                
                let queuedSong = new QueuedSong({
                    id: i,
                    songId: song.id,
                    singerId: singer.id,
                    song: song,
                    singer: singer
                });

                this._cache.push(queuedSong);
            }
        }
    }
}