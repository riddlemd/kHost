export class Song
{
    id: number | null = null;
    
    name: string = "";

    bandName: string = "";

    source: string = "local";

    karaokeBrand: string = 'unknown';

    localPath: string | null = null;

    remotePath: string | null = null;

    notes: string | null = null;

    state: SongState = SongState.Unknown;

    lengthInSeconds: number|null = null;
}

export enum SongState {
    Unknown,
    Ready,
    Broken,
    Downloading
}