import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { QueuedSong } from "../../../karaoke/models/QueuedSong";
import { Singer } from "../../../kommon/models/Singer";
import { Song, SongState } from "../../../kommon/models/Song";
import { QueuedSongsProvider } from "../../providers/QueuedSongsProvider";

@Injectable()
export class MockQueuedSongsProvider extends QueuedSongsProvider {
    
    private _singersCached: number[] = [];
    
    private _cache: QueuedSong[] = [];

    private _nextQueuedSongId: number = 1;

    get(count: number = 20, offset: number = 0): Observable<QueuedSong[]> {
        console.info(`Getting QueuedSongs`);
        return of(this._cache);
    }

    getBySinger(singer: Singer, count: number = 20, offset: number = 0): Observable<QueuedSong[]> {
        console.info(`Getting QueuedSongs for Singer#${singer.id}`);

        if(this._singersCached.indexOf(singer.id) === -1) {
            this._cache = this._cache.concat(this._generateQueuedSongs(singer.id));
            this._singersCached.push(singer.id);
        }

        return of(this._cache.filter(qs => qs.singerId === singer.id));
    }

    remove(queuedSong: QueuedSong): Observable<boolean> {
        console.info(`Removing QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);
        for(let i = 0; i < this._cache.length; i++) {
            if(this._cache[i].id !== queuedSong.id) continue;
            
            this._cache.splice(i, 1);

            return of (true);
        }

        return of(false);
    }

    moveToTop(queuedSong: QueuedSong): Observable<boolean> {
        console.info(`movedToTop QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);
        this._cache.moveToStart(queuedSong);
        return of(true);
    }

    moveToBottom(queuedSong: QueuedSong): Observable<boolean> {
        console.info(`movedToBottom QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);
        this._cache.moveToEnd(queuedSong);
        return of(true);
    }

    moveUp(queuedSong: QueuedSong): Observable<boolean> {
        console.info(`movedUp QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);
        this._cache.moveTowardStart(queuedSong);
        return of(true);
    }

    moveDown(queuedSong: QueuedSong): Observable<boolean> {
        console.info(`movedDown QueuedSong#${queuedSong.id} for Singer#${queuedSong.singerId}`);
        this._cache.moveTowardEnd(queuedSong);
        return of(true);
    }

    private _generateQueuedSongs(singerId: number): QueuedSong[] {
        let queuedSongs = [];
        let maxCount = Math.random() * 10;
        for(var i = 0; i < maxCount; i++)
        {            
            let song = new Song();
            song.id = i;
            song.name = (Math.random() + 1).toString(36).substring(7);
            song.bandName = (Math.random() + 1).toString(36).substring(7);
            song.source = i % 2 ? 'local' : 'youtube';
            song.localPath = i % 2 ? 'local://' : null;
            song.remotePath = i % 2 ? null : 'remote://';
            song.state = SongState.Ready;
            song.lengthInSeconds = Math.random() * 360;

            let singer = new Singer();
            singer.id = singerId;

            let queuedSong = new QueuedSong();
            queuedSong.id = this._nextQueuedSongId++;
            queuedSong.songId = song.id;
            queuedSong.song = song;
            queuedSong.singerId = singer.id;
            queuedSong.singer = singer;

            queuedSongs.push(queuedSong);
        }
        return queuedSongs;
    }
}