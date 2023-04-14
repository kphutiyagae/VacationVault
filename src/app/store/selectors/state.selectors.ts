import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromState from '../reducers/state.reducer';

export const selectStateState = createFeatureSelector<fromState.State>(
  fromState.stateFeatureKey
);
