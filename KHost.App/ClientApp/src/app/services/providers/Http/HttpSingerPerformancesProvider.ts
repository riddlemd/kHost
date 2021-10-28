import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { ApiResponse } from "src/app/models/ApiResponse";
import { Singer } from "src/app/models/Singer";
import { SingerPerformance } from "src/app/models/SingerPerformance";
import { SingerPerformancesProvider } from "../SingerPerformancesProvider";
import { BaseHttpProvider } from "./BaseHttpProvider";

@Injectable()
export class HttpSingerPerformancesProvider extends BaseHttpProvider<SingerPerformance> implements SingerPerformancesProvider {

    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/singer-performances", config, httpClient);
    }

    async findBySinger(singer: Singer, count?: number, offset?: number): Promise<SingerPerformance[]> {
        const url = this._getFullEndpointUrl('/find-by-singer-id');

        const options: any = {
            params: {
                id: singer.id
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<SingerPerformance[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return [];
    }
}