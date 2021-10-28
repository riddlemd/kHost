import { ModelWithId } from "./ModelWIthId";
import { Singer } from "./Singer";
import { Song } from "./Song";
import { Venue } from "./Venue";

export class SingerPerformance implements ModelWithId {

    id?: number;

    singerId?: number;

    singer?: Singer;
    
    songId?: number;

    song?: Song;
    
    venueId?: number;

    venue?: Venue;
    
    date?: Date;
}