import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ApiService} from "../../shared/services/api/api.service";
import {getTripItineraryItems, getUserTripList} from "../../store/actions/state.actions";
import {BehaviorSubject, distinct, distinctUntilChanged, first, Observable, Subscription, switchMap} from "rxjs";
import {IItem} from "../../../models/types";
import {selectTripItineraryItems, selectUserTrips} from "../../store/selectors/state.selectors";
import {ITrip} from "../../../models/types";
import {map} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {currencyCodeObject} from "../../utils/currency-codes";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit{

  tripId: string | undefined;

  tripItinerary$: Observable<IItem[]> | undefined;

  tripList$: Subscription | undefined;

  isAddingItem = false;


  itemAddEditDetails: IItem = {
      cost: 0,
      currency: "",
      description: "",
      end_location: {latitude: 0, longitude: 0},
      item_date_end: "",
      item_date_start: "",
      item_time_end: "",
      item_time_start: "",
      notes: "",
      start_location: {latitude: 0, longitude: 0},
      tags: [],
      title: "",
      trip_id: ""
  }

  currentTrip: ITrip | undefined = {
    name: 'Anniversary',
    trip_id: 'KYObXyOSRWg4eaMX4VIN',
    user_id: '0tol4ljZlRMbC3WMkt7ihklmwzT2 ',
    country: 'Japan',
    trip_end: new Date(),
    description: 'Rising sun, fallen shadow',
    trip_start: new Date(),
    itinerary_id: ''};

  tagOptions = ['Nature', 'Urban', 'Business', 'Personal']
  itineraryCost = 0;

  itemForm: FormGroup;

  currencyCodeArray = Object.keys(currencyCodeObject);

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private store: Store) {

      this.itemForm = new FormGroup({
           cost: new FormControl(this.itemAddEditDetails.cost, [Validators.required, Validators.min(0)]),
           currency: new FormControl(this.itemAddEditDetails.currency, [Validators.minLength(1)]),
           description: new FormControl(this.itemAddEditDetails.description),
          end_location:new FormControl(this.itemAddEditDetails.end_location),
           item_date_end: new FormControl(this.itemAddEditDetails.item_date_end),
           item_date_start: new FormControl(this.itemAddEditDetails.item_date_start),
           item_time_end: new FormControl(this.itemAddEditDetails.item_time_end),
           item_time_start: new FormControl(this.itemAddEditDetails.item_time_start),
            notes: new FormControl(this.itemAddEditDetails.notes),
          start_location: new FormControl(this.itemAddEditDetails.start_location),
           tags: new FormControl(this.itemAddEditDetails.tags),
           title:new FormControl(this.itemAddEditDetails.title, [Validators.required, Validators.minLength(3)])
      })

  }
  ngOnInit(){
    this.tripId = this.route.snapshot.paramMap.get('tripId') ?? '';

    this.store.dispatch(getUserTripList())
    this.store.dispatch(getTripItineraryItems({tripId: this.tripId}))

    this.tripItinerary$ = this.store.select(selectTripItineraryItems)
        .pipe(
            distinct(),
            map(itinerary => {
              itinerary.map( item => this.itineraryCost = this.itineraryCost + Number(item?.cost ?? 0) )
              return itinerary;
            })
        );

    this.tripList$ = this.store.select(selectUserTrips)
        .pipe(
            first(),
            switchMap( tripList => {
              //this.currentTrip = tripList.find((trip) => trip?.trip_id === this.tripId);
                return tripList;
            })

        ).subscribe();

  }

  handleBackButtonClick(){
    this.router.navigate([''])
  }

  handleAddItemButtonClick(){
      this.isAddingItem = true;
  }

  handleEditItemButtonClick(item: IItem){
      this.isAddingItem = true;
  }
  handleItemClick(item: IItem) {
    console.log('Item clicked!', item);
  }

  handleAddItem(){
      console.log('Submitting...')
  }

  handleModalCancel(): void {
    this.isAddingItem = false;
    this.itemForm.reset();
  }
}
