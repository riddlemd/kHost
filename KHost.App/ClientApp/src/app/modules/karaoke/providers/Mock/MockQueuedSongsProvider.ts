import { Injectable } from "@angular/core";
import { SingersProvider } from "../../../../services/providers/SingersProvider";
import { SongsProvider } from "../../../../services/providers/SongsProvider";
import { QueuedSong } from "../../../karaoke/models/QueuedSong";
import { Singer } from "../../../../models/Singer";
import { Song, SongState } from "../../../../models/Song";
import { QueuedSongsProvider } from "../../providers/QueuedSongsProvider";
import "src/app/modules/kommon/mathematics/MathExtensions";

@Injectable()
export class MockQueuedSongsProvider extends QueuedSongsProvider {
        
    private _cache: QueuedSong[] = [];

    constructor(
        private _singersProvider: SingersProvider,
        private _songsProvider: SongsProvider
    ) {
        super();

        this._generateQueuedSongs();
    }

    get(count: number = 20, offset: number = 0): Promise<QueuedSong[]> {
        console.info(`Getting QueuedSongs (Count:${count}, Offset:${offset})`);

        const queuedSongs = this._cache
            .slice(offset, count);

        return new Promise((resolve, reject) => {
            resolve(queuedSongs);
        });
    }

    getBySinger(singer: Singer, count: number = 20, offset: number = 0): Promise<QueuedSong[]> {
        console.info(`Getting QueuedSongs for Singer#${singer.id} (Count:${count}, Offset:${offset})`);

        const queuedSongs = this._cache
            .filter(s => s.singerId == singer.id)
            .slice(offset, count);

        return new Promise((resolve, reject) => {
           resolve(queuedSongs); 
        });
    }

    remove(queuedSong: QueuedSong): Promise<boolean> {
        console.info(`Removing QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        for(let i = 0; i < this._cache.length; i++) {
            if(this._cache[i].id !== queuedSong.id) continue;
            
            this._cache.splice(i, 1);

            return new Promise((resolve, reject) => { resolve(true); });
        }

        return new Promise((resolve, reject) => { reject(); });
    }

    moveToTop(queuedSong: QueuedSong): Promise<boolean> {
        console.info(`movedToTop QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        this._cache.moveToStart(queuedSong);
        
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    moveToBottom(queuedSong: QueuedSong): Promise<boolean> {
        console.info(`movedToBottom QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        this._cache.moveToEnd(queuedSong);
        
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    moveUp(queuedSong: QueuedSong): Promise<boolean> {
        console.info(`movedUp QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);

        this._cache.moveTowardStart(queuedSong);
        
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    moveDown(queuedSong: QueuedSong): Promise<boolean> {
        console.info(`movedDown QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);
        
        this._cache.moveTowardEnd(queuedSong);
        
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    private async _generateQueuedSongs(): Promise<void> {
        console.info(`Generating QueuedSongs`);
        
        this._cache = [];

        const singers: Singer[] = await this._singersProvider.get();
        const songs: Song[] = await this._songsProvider.get();

        for(let singer of singers) {
            const maxQueuedSongs = Math.random() * 11 - 1;

            for(let i = 1; i <= maxQueuedSongs; i++)
            {
                const randomSongId = Math.randomBetween(0, songs.length - 1);
                const song = songs[randomSongId];
                
                let queuedSong = new QueuedSong();
                queuedSong.id = i;
                queuedSong.songId = song.id;
                queuedSong.song = song;
                queuedSong.singerId = singer.id;
                queuedSong.singer = singer;

                this._cache.push(queuedSong);
            }
        }
    }
}