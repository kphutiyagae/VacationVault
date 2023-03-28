import { Injectable, NgZone } from '@angular/core';
import {IUser} from "../../models/user";
import * as auth from 'firebase/auth';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
      public angularFirestore: AngularFirestore,
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
