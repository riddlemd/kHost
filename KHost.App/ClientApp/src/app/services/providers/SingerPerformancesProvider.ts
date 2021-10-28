import { Injectable } from "@angular/core";
import { Singer } from "src/app/models/Singer";
import { SingerPerformance } from "src/app/models/SingerPerformance";
import { CurdProvider } from "./CrudProvider";

@Injectable()
export class SingerPerformancesProvider implements CurdProvider<SingerPerformance> {

    findBySinger(singer: Singer, count?: number, offset?: number): Promise<SingerPerformance[]> {
        throw("Not Implemented");
    }

    // CRUD Methods

    create(singerPerformance: SingerPerformance): Promise<number> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<SingerPerformance[]> {
        throw("Not Implemented");
    }

    update(singerPerformance: SingerPerformance): Promise<void> {
        throw("Not Implemented");
    }
    
    delete(singerPerformance: SingerPerformance): Promise<void> {
        throw("Not Implemented");
    }
}