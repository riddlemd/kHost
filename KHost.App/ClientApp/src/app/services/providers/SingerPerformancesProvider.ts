import { Injectable } from "@angular/core";
import { Singer } from "src/app/models/Singer";
import { SingerPerformance } from "src/app/models/SingerPerformance";

@Injectable()
export class SingerPerformancesProvider {

    get(count: number = 20, offset: number = 0): Promise<SingerPerformance[]> {
        throw("Not Implemented");
    }

    getBySinger(singer: Singer, count: number = 20, offset: number = 0): Promise<SingerPerformance[]> {
        throw("Not Implemented");
    }
}