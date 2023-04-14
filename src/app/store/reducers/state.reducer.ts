import { createFeature, createReducer, on } from '@ngrx/store';
import * as StateActions from '../actions/state.actions';
import {ITrip} from "../../../models/types";

export const stateFeatureKey = 'state';

export interface State {
  userTrips: ITrip[],
}

export const initialState: State = {
  userTrips: [],
};

export const reducer = createReducer(
  initialState,
  on(StateActions.getUserTripData, state => state),
  on(StateActions.getUserTripDataSuccess, (state, {userTrips}) => ({...state, userTrips})),
  on(StateActions.getUserTripDataFailure, (state, action) => state),
);

export const stateFeature = createFeature({
  name: stateFeatureKey,
  reducer,
});

