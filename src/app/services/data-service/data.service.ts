import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { Planet } from 'src/app/shared/models/planets';
import { Vehicle } from 'src/app/shared/models/vehicles';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpService) { }

  getPlanets(): Observable<Array<Planet>> {
    return this.httpService.get('/planets');
  }

  getVehicles(): Observable<Array<Vehicle>> {
    return this.httpService.get('/vehicles');
  }

}
