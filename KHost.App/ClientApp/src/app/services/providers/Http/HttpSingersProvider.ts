import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AppConfig } from "src/app/app.config";
import { ApiResponse } from "src/app/models/ApiResponse";
import { Singer } from "src/app/models/Singer";
import { Venue } from "src/app/models/Venue";
import { SingersProvider } from "../SingersProvider";
import { BaseHttpProvider } from "./BaseHttpProvider";

@Injectable()
export class HttpSingersProvider extends BaseHttpProvider<Singer> implements SingersProvider {
    
    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/singers", config, httpClient);
    }

    async search(query: string, venue?: Venue, count?: number, offset?: number): Promise<Singer[]> {
        const url = this._getFullEndpointUrl('/search');

        const options: any = {
            params: {
                query: query
            }
        };

        if(count) options.params.count = count;

        if(offset) options.params.offset = offset;

        try {
            const response = await this._httpClient.get<ApiResponse<Singer[]>>(url, <object>options).toPromise();
            return response.result;
        }
        catch(exception) {

        }

        return [];
    }
}
