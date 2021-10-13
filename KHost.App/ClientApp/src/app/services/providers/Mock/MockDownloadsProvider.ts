import { Injectable } from "@angular/core";
import { Download } from "src/app/models/Download";
import { DownloadsProvider } from "../DownloadsProvider";

@Injectable()
export class MockDownloadsProvider implements DownloadsProvider {

    getById(id: number): Promise<Download[]> {
        throw ("Not Implemented");
    }

    // CRUD Methods

    create(download: Download): Promise<number> {
        throw("Not Implemented");
    }

    read(count?: number, offset?: number): Promise<Download[]> {
        throw("Not Implemented");
    }

    update(download: Download): Promise<void> {
        throw("Not Implemented");
    }
    
    delete(download: Download): Promise<void> {
        throw("Not Implemented");
    }
}