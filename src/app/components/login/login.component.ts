import { Component } from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import {AuthService} from "../../shared/services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor() {
  }
  ngOnInit(){}
}
