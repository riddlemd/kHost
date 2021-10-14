export class SongSearchResult {

    id: string;

    songName: string;

    bandName: string;

    engineName: string;

    lengthInSeconds: number;

    constructor({
        id,
        songName,
        bandName,
        engineName,
        lengthInSeconds
    }: parameters) {
        this.id = id;
        this.songName = songName;
        this.bandName = bandName;
        this.engineName = engineName;
        this.lengthInSeconds = lengthInSeconds;
    }
}

interface parameters {
    id: string,
    songName: string,
    bandName: string,
    engineName: string,
    lengthInSeconds: number
}