import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "src/app/app.config";
import { Download } from "src/app/models/Download";
import { DownloadsProvider } from "../DownloadsProvider";
import { BaseHttpProvider } from "./BaseHttpProvider";

@Injectable()
export class HttpDownloadsProvider extends BaseHttpProvider<Download> implements DownloadsProvider {
    
    constructor(
        config: AppConfig,
        httpClient: HttpClient
    ) {
        super("/api/downloads", config, httpClient);
    }
}