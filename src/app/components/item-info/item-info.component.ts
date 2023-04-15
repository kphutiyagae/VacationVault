import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit{

  constructor(private route: ActivatedRoute) {
  }
  tripId: string | undefined;
  itemId: string | undefined;
  ngOnInit() {
    this.tripId = this.route.snapshot.paramMap.get('tripId') ?? '';
    this.itemId = this.route.snapshot.paramMap.get('itemId') ?? '';
  }
}
