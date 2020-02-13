import { Component, OnInit, OnDestroy } from '@angular/core';
import { Planet } from 'src/app/shared/models/planets';
import { Vehicle } from 'src/app/shared/models/vehicles';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { SelectionService } from 'src/app/services/selection-service/selection.service';
import { TimeCalculationService } from 'src/app/services/time-calculation-service/time-calculation.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit, OnDestroy {
  planets: Array<Planet> = [];
  selectedPlanets: Array<{ name: string, distance: number }> = [];
  vehicles: Array<Vehicle> = [];
  selectedVehicles: Array<any> = [];
  isP1V1Selected: boolean = false;
  isP2V2Selected: boolean = false;
  isP3V3Selected: boolean = false;
  isP4V4Selected: boolean = false;
  idArr = [1, 2, 3, 4];
  time: number = 0;
  timeSubscription: Subscription = new Subscription();
  planetSubscription: Subscription = new Subscription();
  vehicleSubscription: Subscription = new Subscription();
  constructor(private httpService: HttpService,
    private dataService: DataService,
    private timeSvc: TimeCalculationService,
    private selectionSvc: SelectionService,
    private router: Router
  ) { }

  ngOnInit() {
    //clear any data in services before initialising for start again
    this.clearVehicles()
    this.clearPlanets()
    this.selectionSvc.changeSelectedPlanets(undefined, 0);
    this.httpService.fetchToken();
    this.dataService.getPlanets().subscribe((planets) => {
      this.planets = planets;
      this.planets.map(planet => { planet.isSelected = false; return planet; });
    },
      err => {
        console.log("Error while fetching planets. Please try later.", err);
      });
    this.dataService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles.map(vehicle => {
        return new Vehicle(vehicle.name, vehicle.total_no, vehicle.max_distance, vehicle.speed)
      });
    }, err => {
      console.log("Error while fetching vehicles. Please try later.", err);
    });
    this.timeSubscription = this.timeSvc.calculateTime().subscribe(val => {
      this.time = val;
    });
    this.planetSubscription = this.selectionSvc.getSelectedPlanets()
      .subscribe(planets => this.selectedPlanets = planets);
    this.vehicleSubscription = this.selectionSvc.getSelectedVehicles()
      .subscribe(vehicles => this.selectedVehicles = vehicles);
  }

  reset() {
    this.selectedPlanets = [];
    this.planets.forEach(planet => planet.isSelected = false);
  }

  allSelected() {
    return this.isP1V1Selected && this.isP2V2Selected && this.isP3V3Selected && this.isP4V4Selected;
  }

  submit() {
    const body = {
      token: this.httpService.getTokenValue(),
      planet_names: [...this.selectedPlanets.map(planet => planet.name)],
      vehicle_names: [...this.selectedVehicles.map(vehicle => vehicle.name)]
    }
    const httpHeaders = new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" });
    this.httpService.post('/find', body, httpHeaders).subscribe(resp => {
      if (resp && resp.status) {
        resp.status === 'success' ? this.successRoute(resp.planet_name, this.time) : this.failureRoute()
      } else if (resp && resp.error) {
        this.httpService.fetchToken();
        setTimeout(() => {
          console.log("retrying submit as submit failed due to token error.");
          this.submit();
        }, 3000);
      }
    }, error => {
      console.log(error);
      console.log("Some System Error");
    });
  }

  successRoute(planet, time) {
    this.router.navigateByUrl('/success/' + planet + '/' + time);
  }

  failureRoute() {
    this.router.navigateByUrl('/failure');
  }

  selected(isSelected, id) {
    if (id === 1) this.isP1V1Selected = isSelected;
    if (id === 2) this.isP2V2Selected = isSelected;
    if (id === 3) this.isP3V3Selected = isSelected;
    if (id === 4) this.isP4V4Selected = isSelected;
  }

  clearVehicles() {
    this.idArr.forEach((id) => this.selectionSvc.changeSelectedVehicles(undefined, id - 1))
  }

  clearPlanets() {
    this.idArr.forEach((id) => this.selectionSvc.changeSelectedPlanets(undefined, id - 1))
  }

  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }

}
