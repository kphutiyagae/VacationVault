import {inject, Injectable} from '@angular/core';
import { DocumentReference} from "@angular/fire/compat/firestore";
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
import {from, Observable} from "rxjs";

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

  addTrip(trip: ITrip): Observable<DocumentReference<ITrip>>{
    const tripCollection = collection(this.firestore, 'trips');
    return from(addDoc(tripCollection, trip)) as unknown as Observable<DocumentReference<ITrip>>;
  }

  addItineraryItem(item: IItem, tripId: string): Observable<DocumentReference<IItem>> {
    const itemCollection = collection(this.firestore, `trips/${tripId}/itinerary`);
    return from( addDoc(itemCollection, item) ) as unknown as Observable<DocumentReference<IItem>>;
  }

  getTripItineraryList(tripId:string): Observable<IItem[]>{
    const itineraryCollection = collection(this.firestore, `trips/${tripId}/itinerary`);
    return collectionData(itineraryCollection) as Observable<IItem[]>;
  }

  getTripItinerary(tripId: string, itineraryId: string): Observable<IItem>{
    const itineraryCollection = doc(this.firestore, `trips/${tripId}/itinerary/${itineraryId}`);
    return docData(itineraryCollection) as Observable<IItem>;
  }

  updateTripDetails(tripId:string, updateKeyValuePairs: {} ): Observable<DocumentReference<ITrip>>{
    const tripDocRef = doc(this.firestore, `trips/${tripId}`);
    return from( updateDoc(tripDocRef, updateKeyValuePairs) ) as unknown as Observable<DocumentReference<ITrip>>;
  }

  updateItineraryItemDetails(itemId:string, tripId:string ,updateKeyValuePairs: {})
      : Observable<DocumentReference<IItem>>{
    const itemDocRef = doc(this.firestore, `trips/${tripId}/itinerary/${itemId}`);
    return from( updateDoc(itemDocRef, updateKeyValuePairs) ) as unknown as Observable<DocumentReference<IItem>>;
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
