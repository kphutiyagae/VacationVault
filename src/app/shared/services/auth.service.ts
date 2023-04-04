import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

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
  loginUser(email:string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then( (result) => {
          window.alert('Welcome ' + result.user?.toJSON());
        }).catch( (error) => {
          window.alert(error.message);
        });
  }

  signupUser(email:string,password:string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email,password)
        .then( (result) => {
          window.alert('Welcome to the site' + result?.user?.toJSON())
        })
        .catch( (error) => {
          window.alert(error)
        })
  }

  public get isLoggedIn(){
      return this._isLoggedIn;
  }
}
