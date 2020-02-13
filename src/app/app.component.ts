import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
environment;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() { }
  reset() {
    if (environment.production) {
      window.location.assign('https://mhssvkp.github.io/geektrust-finding-falcone/');
    } else {
      window.location.assign('/');
    }

  }

  gtHome() {
    window.open("https://www.geektrust.in/");
  }
}
