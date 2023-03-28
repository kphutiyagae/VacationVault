import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userEmail = '';
  userPassword = '';
  constructor(protected auth: AuthService) {
  }
  ngOnInit(){}

  log(a: string, b: string){
    //console.log('Form Data : ', { 'email': a, 'password' : b})
    this.auth.loginUser(a,b)
}
}
