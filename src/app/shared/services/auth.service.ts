import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(

      public angularFireAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone
  ) {

    this.angularFireAuth.authState.subscribe( (user) => {
      this.userData = user;
    })
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

}
