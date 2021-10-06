export class SongSearchEngine {
    constructor(
        public name: string,
        public displayName: string=name,
        public isLocal: boolean=true,
        public allowDownload: boolean=false) {

    }
}