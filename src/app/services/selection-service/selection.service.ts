import { Injectable } from '@angular/core';
import { Planet } from 'src/app/shared/models/planets';
import { Vehicle } from 'src/app/shared/models/vehicles';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  selectedPlanets: Array<Planet> = new Array();
  selectedVehicles: Array<Vehicle> = new Array();
  updatePlanetSubject: Subject<Array<Planet>> = new Subject();
  updateVehicleSubject: Subject<Array<Vehicle>> = new Subject();

  constructor() { }

  changeSelectedPlanets(selectedPlanet: Planet, index: number) {
    this.selectedPlanets[index] = selectedPlanet;
    this.updatePlanetSubject.next(this.selectedPlanets);
  }

  changeSelectedVehicles(selectedVehicle: Vehicle, index: number) {
    this.selectedVehicles[index] = selectedVehicle;
    this.updateVehicleSubject.next(this.selectedVehicles);
  }

  getSelectedPlanets(): Subject<Array<Planet>> {
    return this.updatePlanetSubject;
  }

  getSelectedVehicles(): Subject<Array<Vehicle>> {
    return this.updateVehicleSubject;
  }

}
