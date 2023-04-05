import { Component } from '@angular/core';
import { AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userEmail = '';
  userPassword = '';
constructor(protected auth: AuthService) {

}

ngOnInit() {}

  handleSignup(a: string, b: string){
    //console.log('Form Data : ', { 'email': a, 'password' : b})
    this.auth.signupUser(a,b);
  }
}
