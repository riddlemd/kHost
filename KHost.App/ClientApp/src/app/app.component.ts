import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kHost';

  constructor() {

  }

  ngOnInit(): void {
    //document.addEventListener('contextmenu', function(e) { e.preventDefault(); }); // We disable contextmenu this way, because otherwise the .cdk-overlay-container element will still have one.
  }
}
