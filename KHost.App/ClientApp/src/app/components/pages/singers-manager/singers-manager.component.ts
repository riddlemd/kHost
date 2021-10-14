import { Component, OnInit } from '@angular/core';
import { Singer } from 'src/app/models/Singer';
import { SingersProvider } from 'src/app/services/providers/SingersProvider';

@Component({
  templateUrl: './singers-manager.component.html',
  styleUrls: ['./singers-manager.component.scss']
})
export class SingersManagerComponent implements OnInit {

  singers: Singer[] = [];

  selectedSinger?: Singer;

  constructor(private _singersProvider: SingersProvider) { }

  ngOnInit(): void {
    this._singersProvider.read()
      .then(value => { this.singers = value; });
  }

}
