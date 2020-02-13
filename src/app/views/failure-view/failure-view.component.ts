import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failure-view',
  templateUrl: './failure-view.component.html',
  styleUrls: ['./failure-view.component.css']
})
export class FailureViewComponent {

  constructor(private router: Router) { }

  tryAgain() {
    this.router.navigateByUrl('');
  }

}
