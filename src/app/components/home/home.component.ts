import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {ITrip} from "../../../models/types";
import {ApiService} from "../../shared/services/api/api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {country_list} from "../../utils/country-list";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  userTrips$: Observable<ITrip[]> | undefined;

  isAddingtrip = false;

  addTripForm: FormGroup;

  tripAddDetails = {
    country: '',
    description: '',
    itinerary_id: '',
    name: '',
    trip_start: undefined,
    trip_end: undefined,
    user_id: ''
  }

  countryList: undefined | string[];

  constructor(
      private apiService: ApiService
  ) {
    this.countryList = country_list;

    this.userTrips$ = this.apiService.getAllTrips();

    this.addTripForm = new FormGroup({
      country: new FormControl (this.tripAddDetails.country,
          [Validators.required, Validators.minLength(3)]),
      description: new FormControl (this.tripAddDetails.description),
      name: new FormControl (this.tripAddDetails.name,
          [Validators.required, Validators.minLength(3)]),
      trip_start: new FormControl (this.tripAddDetails.trip_start,
          [Validators.required]),
      trip_end: new FormControl (this.tripAddDetails.trip_end,
          [Validators.required]),
    })
}

  handleAddTrip(){
    console.log("Add trip clicked");
    this.isAddingtrip = true;
  }

  handleModalCancel(): void {
    this.isAddingtrip = false;
  }

}
