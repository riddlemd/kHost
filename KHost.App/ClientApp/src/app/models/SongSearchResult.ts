import { SongSearchEngine } from "./SongSearchEngine";

export class SongSearchResult {

    id: string = '';

    songName: string = '';

    bandName: string = '';

    engine: SongSearchEngine|null = null;

    lengthInSeconds: number|null = null;
}