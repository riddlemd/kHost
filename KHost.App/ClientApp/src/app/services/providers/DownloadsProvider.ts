import { Injectable } from "@angular/core";
import { Download } from "src/app/models/Download";
import { CrudProvider } from "./CrudProvider";

@Injectable()
export class DownloadsProvider implements CrudProvider<Download> {
    
    findById(id: number): Promise<Download | undefined> {
        throw ("Not Implemented");
    }

    findByIds(ids: number[]): Promise<Download[]> {
        throw("Not Implemented");
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
