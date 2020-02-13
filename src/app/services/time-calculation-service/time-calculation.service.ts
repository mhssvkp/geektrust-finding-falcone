import { Injectable } from '@angular/core';
import { SelectionService } from '../selection-service/selection.service';
import { Planet } from 'src/app/shared/models/planets';
import { Vehicle } from 'src/app/shared/models/vehicles';
import { Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeCalculationService {

  private selectedPlanets: Array<Planet> = new Array();
  private selectedVehicles: Array<Vehicle> = new Array();
  private planetSubscription: Subscription = new Subscription();
  private vehicleSubscription: Subscription = new Subscription();
  private timeSubject: Subject<number> = new Subject();
  constructor(private selectionService: SelectionService) {
    this.planetSubscription = this.selectionService.getSelectedPlanets()
      .subscribe(planets => {
        this.selectedPlanets = planets;
        if (this.selectedPlanets) this.updateTime();
      });
    this.vehicleSubscription = this.selectionService.getSelectedVehicles()
      .subscribe(vehicles => {
        this.selectedVehicles = vehicles;
        if (this.selectedVehicles) this.updateTime();
      });
  }

  calculateTime() {
    return this.timeSubject;
  }

  private updateTime() {
    const time = this.selectedPlanets.reduce((totalTime, planet, ind) => {
      const vehicle = this.selectedVehicles[ind];
      if (vehicle && planet) {
        totalTime = totalTime + (planet.distance / vehicle.speed);
      }
      return totalTime;
    }, 0);
    this.timeSubject.next(time);
  }
}
