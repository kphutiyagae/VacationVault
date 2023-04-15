import { createAction, props } from '@ngrx/store';
import {IError, ITrip} from "../../../models/types";

export const getUserTripData = createAction(
  '[State] Get User Trips Data'
);

export const getUserTripDataSuccess = createAction(
  '[State] Get User Trips Data Success',
  props<{ userTrips: ITrip[] }>()
);

export const getUserTripDataFailure = createAction(
  '[State] Get User Trips Data Failure',
  props<{ error: IError }>()
);
