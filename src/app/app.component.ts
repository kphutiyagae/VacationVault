import {Component} from '@angular/core';
import {ApiService} from "./shared/services/api/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vacation-vault';

  constructor( protected apiServ: ApiService) {

  }

}
