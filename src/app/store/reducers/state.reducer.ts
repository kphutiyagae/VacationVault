import { createFeature, createReducer, on } from '@ngrx/store';
import * as StateActions from '../actions/state.actions';

export const stateFeatureKey = 'state';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(StateActions.getUserTripData, state => state),
  on(StateActions.getUserTripDataSuccess, (state, action) => state),
  on(StateActions.getUserTripDataFailure, (state, action) => state),
);

export const stateFeature = createFeature({
  name: stateFeatureKey,
  reducer,
});

