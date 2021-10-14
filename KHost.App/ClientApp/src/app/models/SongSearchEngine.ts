export class SongSearchEngine {

    name: string;
    
    displayName: string;
    
    isLocal: boolean;
    
    allowDownload: boolean;

    constructor({
        name,
        displayName,
        isLocal,
        allowDownload
    }: parameters) {
        this.name = name;
        this.displayName = displayName;
        this.isLocal = isLocal ?? true;
        this.allowDownload = allowDownload ?? false;
    }
}

interface parameters {
    name: string,
    displayName: string,
    isLocal?: boolean,
    allowDownload?: boolean
}