import { Component } from '@angular/core';
import { AuthService} from "../../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  userSignupDetails = {
    email: '',
    password: ''
  }

constructor(protected auth: AuthService,
            protected modal: NzModalService,
            private router: Router) {
  this.signupForm = new FormGroup({
    email: new FormControl(this.userSignupDetails.email,
        [
          Validators.required,
          Validators.email
        ]),
    password: new FormControl(this.userSignupDetails.password,
        [
          Validators.required,
        ])
  });
}

  attemptSignup(email: string, password: string){
    this.auth.signupUser(email,password).then(authRequest => {

      if(authRequest.result === 'error'){
        this.modal.error({
          nzTitle: 'Signup failed',
          nzContent: 'Oops! something went wrong on our side. Please try again.'
        })
      }
      else{
        this.router.navigateByUrl('');
      }
    } ).catch( error => {})
  }
}
