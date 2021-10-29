import { Component, OnInit } from '@angular/core';
import { Download } from 'src/app/models/Download';
import { DownloadsProvider } from 'src/app/services/providers/DownloadsProvider';

@Component({
  templateUrl: './downloads-manager.component.html',
  styleUrls: ['./downloads-manager.component.scss']
})
export class DownloadsManagerComponent implements OnInit {

  private _downloads: Download[] = [];
  get downloads() { return this._downloads; } 

  selectedDownload?: Download;

  constructor(
    private _downloadsProvider: DownloadsProvider
  ) { 
    
  }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(): Promise<void> {
    this._downloadsProvider.read()
      .then(downloads => { this._downloads = downloads; });
  }

}
