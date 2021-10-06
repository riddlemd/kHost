import { Injectable } from "@angular/core";
import { Singer } from "../models/Singer";
import { SingerPerformance } from "../models/SingerPerformance";

@Injectable()
export class SingerPerformancesProvider {
    constructor() {
        
    }

    get(count: number = 20, offset: number = 0): Promise<SingerPerformance[]> {
        throw("Not Implemented");
    }

    getBySinger(singer: Singer, count: number = 20, offset: number = 0): Promise<SingerPerformance[]> {
        throw("Not Implemented");
    }
}