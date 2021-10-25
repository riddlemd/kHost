import { ModelWithId } from "./ModelWIthId";

export class Song implements ModelWithId {

    public id?: number;

    public name: string = "";

    public bandName: string = "";
    
    public source: string = "";
    
    public karaokeBrand: string = "";
    
    public localPath?: string;
    
    public remotePath?: string;
    
    public notes: string = "";
    
    public state: SongState = SongState.Unknown;
    
    public lengthInSeconds: number = 0;
}

export enum SongState {
    Unknown,
    Ready,
    Broken,
    Downloading
}