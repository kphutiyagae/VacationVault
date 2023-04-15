import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {ApiService} from "../../shared/services/api/api.service";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit{

  tripId: string | undefined;
  constructor(
      private route: ActivatedRoute,
      private store: Store,
      apiService: ApiService) {

  }
  ngOnInit(){
    this.tripId = this.route.snapshot.paramMap.get('tripId') ?? '';
  }
}
