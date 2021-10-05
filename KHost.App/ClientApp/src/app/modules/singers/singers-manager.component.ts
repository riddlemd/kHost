import { Component, OnInit } from '@angular/core';
import { Singer } from '../kommon/models/Singer';
import { SingersProvider } from 'src/app/modules/kommon/providers/SingersProvider';

@Component({
  selector: 'kh-singers-manager',
  templateUrl: './singers-manager.component.html',
  styleUrls: ['./singers-manager.component.scss']
})
export class SingersManagerComponent implements OnInit {

  singers: Singer[] = [];

  private _selectedSinger: Singer|null = null;
  get selectedSinger() { return this._selectedSinger; }
  set selectedSinger(song: Singer|null) {this._selectedSinger = song; }

  constructor(private _singersProvider: SingersProvider) { }

  ngOnInit(): void {
    this._singersProvider.get()
      .subscribe(
        value => { this.singers = value; }
      )
  }

}
