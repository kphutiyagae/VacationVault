export interface IUser {
    user_id: string;
    email: string;
    user_name: string;
    email_verified: string;
}

export interface IItem {
    cost: number;
    currency: string;
    date_time_end: Date | undefined;
    date_time_start: Date | undefined;
    description: string;
    end_location:  { latitude: number, longitude: number };
    notes: string;
    start_location: { latitude: number, longitude: number };
    tags: string[];
    title: string;
    trip_id: string;
}

export interface ITrip {
    user_id:string;
    name: string;
    country: string;
    description:string;
    trip_end: Date;
    trip_start:Date;
    itinerary_id:string;
}
