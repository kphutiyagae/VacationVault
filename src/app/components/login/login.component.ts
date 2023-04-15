import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
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
      protected modal: NzModalService,

      private router: Router
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

    attemptLogin(email: string, password: string){

    this.auth.loginUser(email,password).then(authRequest => {

        if(authRequest.result === 'error'){
            this.modal.error({
                nzTitle: 'Login failed',
                nzContent: 'The provided email/password combination is incorrect. Please check details and try again.'
            })
        }
        else{
            this.router.navigateByUrl('');
        }
    } ).catch( () => {
        this.modal.error({
            nzTitle: 'Login failed',
            nzContent: 'An error on our side occurred. Please try again.'
        })
    })

  }

}
