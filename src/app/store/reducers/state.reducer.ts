import { createFeature, createReducer, on } from '@ngrx/store';
import * as StateActions from '../actions/state.actions';
import {ITrip} from "../../../models/types";
import {IItem} from "../../../models/types";

export const stateFeatureKey = 'state';

export interface State {
  userTrips: ITrip[],
  tripItinerary: IItem[]
}

export const initialState: State = {
  userTrips: [],
  tripItinerary: []
};

export const reducer = createReducer(
  initialState,
    on(StateActions.getUserTripList, state => state),
    on(StateActions.getUserTripListSuccess, (state, {userTrips}) => ({...state, userTrips})),
    on(StateActions.getUserTripListFailure, (state, action) => state),
    on(StateActions.getTripItineraryItems, state => state),
    on(StateActions.getTripItineraryItemsSuccess, (state, {tripItinerary}) => ({...state, tripItinerary})),
    on(StateActions.getTripItineraryItemsFailure, (state, action) => state),
);

export const stateFeature = createFeature({
  name: stateFeatureKey,
  reducer,
});

