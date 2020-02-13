import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }

  reset() {
    window.location.reload();
  }

  gtHome() {
    window.open("https://www.geektrust.in/");
  }
}
