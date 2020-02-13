import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Planet } from 'src/app/shared/models/planets';
import { SelectionService } from 'src/app/services/selection-service/selection.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent implements OnInit, OnDestroy {

  isSelected: boolean = false;
  @Input() planets: Array<Planet>;
  @Input() id: number;
  @Input() vehicles: any[];
  @Output('selected') selectedPlanet: EventEmitter<boolean> = new EventEmitter();
  selectedIndex: number = -1;
  planetSelected: Planet = new Planet();
  selectedPlanets: Array<Planet> = new Array();
  subscription: Subscription;
  vehicleSelected: boolean;
  constructor(private selectionService: SelectionService) { }

  ngOnInit() {
    this.subscription = this.selectionService.getSelectedPlanets().subscribe(planets => {
      this.selectedPlanets = planets;
    });
  }

  selected(event: Event) {
    this.selectedIndex = event.target['value'];
    const planet = this.planets[this.selectedIndex];
    if (planet) {
      this.planetSelected = planet;
      planet.isSelected = true;
      this.isSelected = true;
    } else {
      this.isSelected = false;
      this.vehicleSelected = false;
      this.selectedPlanet.emit(this.vehicleSelected && this.isSelected);
      this.planetSelected = null;
    }
    this.updatePlanet(planet);
  }

  updatePlanet(planet) {
    if (planet) {
      const { name, distance } = planet;
      let selectedPlanet = {
        name, distance
      }
      this.replacePlanet(this.selectedPlanets[this.id - 1], selectedPlanet, this.id - 1);
    } else {
      this.replacePlanet(this.selectedPlanets[this.id - 1], null, this.id - 1);
    }

  }

  replacePlanet(unSelectedPlanet, selectedPlanet, index) {
    if (unSelectedPlanet)
      this.planets.filter((p) => p.name === unSelectedPlanet.name)
        .forEach(p => p.isSelected = false);
    this.selectedPlanets[index] = selectedPlanet ? selectedPlanet : null;
    this.selectionService.changeSelectedPlanets(this.planetSelected, this.id - 1);
    this.selectedPlanet.emit(this.vehicleSelected && this.isSelected);
  }

  vehicleSelection(vehicleBool) {
    this.vehicleSelected = vehicleBool;
    this.selectedPlanet.emit(this.vehicleSelected && this.isSelected);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
