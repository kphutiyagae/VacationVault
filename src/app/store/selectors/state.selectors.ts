import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromState from '../reducers/state.reducer';

export const selectUserTripsState = createFeatureSelector<fromState.State>(
  fromState.stateFeatureKey
);

export const selectUserTrips = createSelector(
    selectUserTripsState,
    (state) => state.userTrips
)

export const selectTripItineraryItems = createSelector(
    selectUserTripsState,
    (state) => state.tripItinerary
)