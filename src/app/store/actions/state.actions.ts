import { createAction, props } from '@ngrx/store';
import {IError, ITrip} from "../../../models/types";
import {IItem} from "../../../models/types";

export const getUserTripList = createAction(
  '[State] Get User Trips Data',
    props<{user_id: string}>()
);

export const getUserTripListSuccess = createAction(
  '[State] Get User Trips Data Success',
  props<{ userTrips: ITrip[] }>()
);

export const getUserTripListFailure = createAction(
  '[State] Get User Trips Data Failure',
  props<{ error: IError }>()
);

export const getTripItineraryItems = createAction(
    '[State] Get Trip Itinerary Items',
    props<{tripId: string}>()
);

export const getTripItineraryItemsSuccess = createAction(
    '[State] Get Trip Itinerary Items Success',
    props<{tripItinerary: IItem[]}>()
);

export const getTripItineraryItemsFailure = createAction(
    '[State] Get User Trips Data Failure',
    props<{ error: IError }>()
);