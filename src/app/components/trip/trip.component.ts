import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ApiService} from "../../shared/services/api/api.service";
import {getTripItineraryItems, getUserTripList} from "../../store/actions/state.actions";
import {
    BehaviorSubject,
    distinct,
    distinctUntilChanged,
    EMPTY,
    first,
    Observable,
    Subscription,
    switchMap,
    tap
} from "rxjs";
import {IItem} from "../../../models/types";
import {selectTripItineraryItems, selectUserTrips} from "../../store/selectors/state.selectors";
import {ITrip} from "../../../models/types";
import {map} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {currencyCodeObject} from "../../utils/currency-codes";
import {calculateItineraryCost} from "../../utils/currency";
import {getCurrencySymbol} from "../../utils/currency";
import {getUserId} from "../../utils/credentials";

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

  isOkLoading = false;

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

  currentTrip: ITrip | undefined;

  tagOptions = ['Nature', 'Urban', 'Business', 'Personal']

  itineraryCost = 0;

  baseCurrency = 'ZAR';

  itemForm: FormGroup;

  currencyCodeArray = Object.keys(currencyCodeObject);

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private apiService: ApiService,
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
    this.store.dispatch(getUserTripList({user_id: getUserId() as string}))
    this.store.dispatch(getTripItineraryItems({tripId: this.tripId}))

    this.tripItinerary$ = this.store.select(selectTripItineraryItems)
        .pipe(
            distinct(),
            map(itinerary => {
                console.log('TOTAL COST: ', calculateItineraryCost(itinerary, this.baseCurrency, this.apiService ));
              return itinerary;
            })
        );

    this.tripList$ = this.store.select(selectUserTrips)
        .pipe(
            first(),
            switchMap( tripList => {
                this.currentTrip = tripList.find((trip) => trip?.trip_id === this.tripId);
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

      this.isOkLoading = true;

      const newItem: IItem = {
          cost: this.itemForm?.value?.['cost'] ?? 0,
          currency: this.itemForm?.value?.['currency'] ?? 'ZAR',
          description: this.itemForm?.value?.['description'] ?? 'No description provided',
          end_location: {latitude: 0, longitude: 0},
          item_date_end: this.itemForm?.value?.['item_date_end'] ?? '',
          item_date_start: this.itemForm?.value?.['item_date_start'] ?? '',
          item_time_end: this.itemForm?.value?.['item_time_end'] ?? '',
          item_time_start: this.itemForm?.value?.['item_date_start'] ?? '',
          notes: this.itemForm?.value?.['notes'] ?? 'No notes provided',
          start_location: {latitude: 0, longitude: 0},
          tags: this.itemForm?.value?.['tags'] ?? [],
          title: this.itemForm?.value?.['title'] ?? 'No title provided',
          trip_id: this?.tripId ?? ''
      }

      this.apiService.addItineraryItem(newItem, this.tripId as string)
          .pipe(
              first(),
              switchMap( generatedItemId => {

                  newItem.item_id = generatedItemId;
                  return this.apiService.updateItineraryItemDetails(generatedItemId,this.tripId as string, newItem)
                      .pipe( switchMap( () => {
                          this.itemForm.reset();
                          this.isOkLoading = false;
                          this.isAddingItem = false;
                          return EMPTY;
                      }))
              })
          ).subscribe()
  }

  handleItemDelete(item: IItem){
      console.log(item)

      if(item?.item_id)
        this.apiService.removeItineraryItem(item.item_id, this.tripId as string);
  }

  handleConfirmModal(){

  }

  handleModalCancel(): void {
    this.isAddingItem = false;
    this.itemForm.reset();
  }

    protected readonly getCurrencySymbol = getCurrencySymbol;
}
