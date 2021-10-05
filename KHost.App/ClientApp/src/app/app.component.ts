import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kHost';

  constructor(private _router: Router) {

  }

  ngOnInit(): void {
    //document.addEventListener('contextmenu', function(e) { e.preventDefault(); }); // We disable contextmenu this way, because otherwise the .cdk-overlay-container element will still have one.
  }

  navigateTo(url:string): void {
    this._router.navigateByUrl(url);
  }
}
