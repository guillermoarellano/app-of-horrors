import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlantListing } from '../models/plant-listing';
import { PLANT_LISTINGS } from '../../../assets/db/plant-listings';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor() { }

  public getPlantListings(): Observable<PlantListing[]> {
    return of(PLANT_LISTINGS);
  }
}
