import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/app/shared/models/vehicles';
import { SelectionService } from 'src/app/services/selection-service/selection.service';


@Component({
  selector: 'app-custom-radio-select',
  templateUrl: './custom-radio-select.component.html',
  styleUrls: ['./custom-radio-select.component.css']
})
export class CustomRadioSelectComponent implements OnInit, OnDestroy {

  @Input() vehicles: Array<Vehicle>;
  @Input() id: number;
  @Input() set destinationDist(distance) {
    this.distance = distance;
    this.selectedVName = "";
    console.log(distance);
    if (this.vehicleSelected || distance < 0) {
      this.vehicleSelected.addCount();
      this.isSelected = false;
      this.selected.emit(this.isSelected);
      this.vehicleSelected = undefined;
      this.selectionService.changeSelectedVehicles(this.vehicleSelected, this.id - 1);
    }
  };
  @Output() selected: EventEmitter<boolean> = new EventEmitter();
  distance: number;
  isSelected: boolean = false;
  selectedVName: string;
  vehicleSelected: Vehicle;

  constructor(private selectionService: SelectionService) { }

  ngOnInit() { }

  vehicelSelection(event: Event) {
    let selectedName = event.target['value'];
    if (this.isSelected) {
      this.vehicles.forEach(vehicle => {
        if (vehicle.name === selectedName) {
          this.vehicleSelected = vehicle;
          vehicle.reduceCount();
        }
      });
    } else {
      this.vehicles.forEach(vehicle => {
        if (vehicle.name === selectedName) {
          this.vehicleSelected = vehicle;
          vehicle.reduceCount();
        }
        if (vehicle.name === this.selectedVName) {
          vehicle.addCount();
        }
      });
      this.isSelected = true;
      this.selected.emit(this.isSelected);
    }
    this.selectedVName = selectedName;
    this.selectionService.changeSelectedVehicles(this.vehicleSelected, this.id - 1);
  }

  ngOnDestroy() {
    this.isSelected = false;
    this.selected.emit(this.isSelected);
    setTimeout(() => {
      this.vehicles.forEach(vehicle => {
        if (vehicle.name === this.selectedVName) {
          vehicle.addCount();
        }
      });
    }, 0);

  }

}
