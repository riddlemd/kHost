export class Song {

    public name: string;

    public bandName: string;
    
    public source: string;
    
    public karaokeBrand: string;
    
    public id?: number;
    
    public localPath?: string;
    
    public remotePath?: string;
    
    public notes: string;
    
    public state: SongState;
    
    public lengthInSeconds: number;

    constructor({
        name,
        bandName,
        source,
        karaokeBrand,
        id,
        localPath,
        remotePath,
        notes,
        state,
        lengthInSeconds
    }: parameters) {
        this.name = name;
        this.bandName = bandName;
        this.source = source;
        this.karaokeBrand = karaokeBrand;
        this.id = id;
        this.localPath = localPath;
        this.remotePath = remotePath;
        this.notes = notes ?? '';
        this.state = state ?? SongState.Unknown;
        this.lengthInSeconds = lengthInSeconds ?? 0;
    }
}

export enum SongState {
    Unknown,
    Ready,
    Broken,
    Downloading
}

interface parameters {
    name: string,
    bandName: string,
    source: string,
    karaokeBrand: string,
    id?: number,
    localPath?: string,
    remotePath?: string,
    notes?: string,
    state?: SongState,
    lengthInSeconds?: number
}