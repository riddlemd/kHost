import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kh-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  constructor(private _router: Router) { }

  navigateTo(url:string): void {
    this._router.navigateByUrl(url);
  }
}
