import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {IAuthResult} from "../../../models/types";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  _isLoggedIn: boolean;

  constructor(
      public angularFireAuth: AngularFireAuth,
  ) {

    this.angularFireAuth.authState.subscribe( (user) => {
      this.userData = user;
    })

      this._isLoggedIn = false;
  }
  loginUser(email:string, password: string): Promise<IAuthResult> {

      return this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then( (result) => {
            const successLoginObject: IAuthResult = {
                result: 'success',
                additional_info: {
                    'user_id': result.user?.uid,
                    'user_JWT': result.user?.getIdTokenResult().then( token => {return token})
                }
            }

            this._isLoggedIn = true;

            return successLoginObject;
        }).catch( (error) => {
            const errorObject: IAuthResult = {
                result: 'error',
                additional_info: error.message
            }
            return errorObject;
        });
  }

  signupUser(email:string,password:string): Promise<IAuthResult> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email,password)
        .then( (result) => {
            const successLoginObject: IAuthResult = {
                result: 'success',
                additional_info: {
                    'user_id': result.user?.uid,
                    'user_JWT': result.user?.getIdTokenResult().then( token => {return token})
                }
            }
            this._isLoggedIn = true;

            return successLoginObject;

        })
        .catch( (error) => {
            const errorObject: IAuthResult = {
                result: 'error',
                additional_info: error.message
            }
            return errorObject;
        })
  }

  public get isLoggedIn(){
      return this._isLoggedIn;
  }

  public get userId(){
      //return this.userData.user_id;
      return '0tol4ljZlRMbC3WMkt7ihklmwzT2';
  }
}
