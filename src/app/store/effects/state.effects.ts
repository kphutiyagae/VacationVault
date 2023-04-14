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

      ofType(StateActions.getUserTripData),

        switchMap( () =>
        this.apiService.getAllTrips()
            .pipe(
                map( response => StateActions.getUserTripDataSuccess({userTrips: response})))
        ),
        catchError( err => {

          const responseErrorObject: IError = {
            message: "Oops an error has occurred.",
            additional_info: {
              error: err
            }
          }

          StateActions.getUserTripDataFailure({error: responseErrorObject})

          return EMPTY;
        })
    );
  });

  constructor(private actions$: Actions,
              private apiService: ApiService) {

  }
}
