import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userLoginDetails = {
    email: '',
    password: ''
  }

    loginForm: FormGroup;
  constructor(
      protected auth: AuthService,
  ) {
      this.loginForm = new FormGroup({
          email: new FormControl(this.userLoginDetails.email,
              [
                  Validators.required,
                  Validators.email
              ]),
          password: new FormControl(this.userLoginDetails.password,
              [
                  Validators.required,
              ])
      });
  }
  ngOnInit(){

  }

  log(a: string, b: string){
    //console.log('Form Data : ', { 'email': a, 'password' : b})
    this.auth.loginUser(a,b)
}
}
