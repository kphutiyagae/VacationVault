import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit{

  tripId: string | undefined;
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit(){
    this.tripId = this.route.snapshot.paramMap.get('tripId') ?? '';
  }
}
