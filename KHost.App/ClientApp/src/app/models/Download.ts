export class Download {

    name: string;

    songId: number;

    id?: number;

    progress: number = 0;

    constructor({
        name,
        songId,
        id,
        progress
    }: parameters) {
        this.name = name;
        this.songId = songId;
        this.id = id;
        this.progress = progress;
    }
}

interface parameters {
    name: string,
    songId: number,
    id: number,
    progress: number
}