import { Injectable } from "@angular/core";
import { Download } from "src/app/models/Download";
import { DownloadsProvider } from "../DownloadsProvider";

@Injectable()
export class MockDownloadsProvider extends DownloadsProvider {
    
    get(count: number = 20, offset: number = 0): Promise<Download[]> {
        throw ("Not Implemented");
    }

    getById(id: number): Promise<Download[]> {
        throw ("Not Implemented");
    }
}