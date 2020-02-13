import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success-view',
  templateUrl: './success-view.component.html',
  styleUrls: ['./success-view.component.css']
})
export class SuccessViewComponent implements OnInit {

  time: number = 0;
  planet: string = '';
  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planet = params.planet;
      this.time = params.time;
      console.log(params);
    })
  }

  startAgain(){
    this.router.navigateByUrl('');
  }

}
