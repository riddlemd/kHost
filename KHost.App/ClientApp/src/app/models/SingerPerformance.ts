export class SingerPerformance {

    singerId: number;
    
    songId: number;
    
    venueId: number;
    
    date: Date;
    
    id?: number;
    
    constructor({
        singerId,
        songId,
        venueId,
        date,
        id
    }: parameters) {
        this.singerId = singerId;
        this.songId = songId;
        this.venueId = venueId;
        this.date = date;
        this.id = id;
    }
}

interface parameters {
    singerId: number,
    songId: number,
    venueId: number,
    date: Date,
    id: number
}
