import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITrip} from "../../../../models/types";
import {Event} from "@angular/router";

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent {

  @Input() trip: ITrip | undefined;
  @Output() click = new EventEmitter<Event>();

  onTripClick(event: Event) {
    this.click.emit(event);
  }
}
