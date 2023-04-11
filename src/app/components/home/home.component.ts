import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {ITrip} from "../../../models/types";
import {ApiService} from "../../shared/services/api/api.service";
import {NzListComponent} from "ng-zorro-antd/list";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  userTrips$: Observable<ITrip[]> | undefined;
  constructor(
      private apiService: ApiService
  ) {
    this.userTrips$ = this.apiService.getAllTrips();
}

  handleAddTrip(){
    console.log("Add trip clicked");
  }


}
