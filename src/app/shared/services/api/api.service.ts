import {inject, Injectable} from '@angular/core';
import {ITrip} from "../../../../models/types";
import {
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  deleteDoc,
  updateDoc
} from "@angular/fire/firestore";
import {from, Observable, of, switchMap} from "rxjs";

import {IItem} from "../../../models/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  firestore: Firestore = inject(Firestore);
  constructor(
  ) {}

  public getAllTrips(): Observable<ITrip[]> {
    const tripCollection = collection(this.firestore, 'trips');
    return collectionData(tripCollection) as Observable<ITrip[]>;
  }

  getTripInfo(tripId: string): Observable<ITrip>{
    const tripReference = doc(this.firestore, `trips/${tripId}/`);
    return docData(tripReference) as Observable<ITrip>;
  }

  addTrip(trip: ITrip): Observable<string>{
    const tripCollection = collection(this.firestore, 'trips');
    return from(addDoc(tripCollection, trip)).pipe(
        switchMap( reference => of(reference.id))
    )
  }

  addItineraryItem(item: IItem, tripId: string): Observable<string> {
    const itemCollection = collection(this.firestore, `trips/${tripId}/itinerary`);
    return from( addDoc(itemCollection, item) ).pipe(
        switchMap( documentReference =>
          documentReference.id
        )
    )
  }

  getTripItineraryList(tripId:string): Observable<IItem[]>{
    const itineraryCollection = collection(this.firestore, `trips/${tripId}/itinerary`);
    return collectionData(itineraryCollection) as Observable<IItem[]>;
  }

  getTripItinerary(tripId: string, itineraryId: string): Observable<IItem>{
    const itineraryCollection = doc(this.firestore, `trips/${tripId}/itinerary/${itineraryId}`);
    return docData(itineraryCollection) as Observable<IItem>;
  }

  updateTripDetails(tripId:string, updateKeyValuePairs: {} ): Observable<void>{
    const tripDocRef = doc(this.firestore, `trips/${tripId}`);
    return from( updateDoc(tripDocRef, updateKeyValuePairs) );
  }

  updateItineraryItemDetails(itemId:string, tripId:string ,updateKeyValuePairs: {})
      : Observable<void>{
    const itemDocRef = doc(this.firestore, `trips/${tripId}/itinerary/${itemId}`);
    return from( updateDoc(itemDocRef, updateKeyValuePairs) );
  }

  removeTrip(tripId:string): Observable<void>{
    const tripDocRef = doc(this.firestore, `trips/${tripId}`);
    return from(deleteDoc(tripDocRef));
  }

  removeItineraryItem(itemId:string, tripId:string): Observable<void>{
    const itemDocRef = doc(this.firestore, `trips/${tripId}/itinerary/${itemId}`);
    return from(deleteDoc(itemDocRef));
  }

}
