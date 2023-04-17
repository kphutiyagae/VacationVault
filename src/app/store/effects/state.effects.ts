import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as StateActions from '../actions/state.actions';
import {ApiService} from "../../shared/services/api/api.service";
import {IError} from "../../../models/types";


@Injectable()
export class StateEffects {

  getUserTrips$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(StateActions.getUserTripList),

        switchMap( (props) =>
        this.apiService.getAllTrips(props.user_id)
            .pipe(
                map( response => StateActions.getUserTripListSuccess({userTrips: response})))
        ),
        catchError( err => {

          const responseErrorObject: IError = {
            message: "Oops an error has occurred.",
            additional_info: {
              error: err
            }
          }

          StateActions.getUserTripListFailure({error: responseErrorObject})

          return EMPTY;
        })
    );
  });

  getTripItineraryItems$ = createEffect(() => {
    return this.actions$.pipe(

        ofType(StateActions.getTripItineraryItems),

        switchMap( (props) =>
            this.apiService.getTripItineraryList(props.tripId)
                .pipe(
                    map( response => {
                      console.log(response);
                      return StateActions.getTripItineraryItemsSuccess({tripItinerary: response})
                    }))
        ),
        catchError( err => {

          const responseErrorObject: IError = {
            message: "Oops an error has occurred.",
            additional_info: {
              error: err
            }
          }

          StateActions.getTripItineraryItemsFailure({error: responseErrorObject})

          return EMPTY;
        })
    );
  });

  constructor(private actions$: Actions,
              private apiService: ApiService) {

  }
}
