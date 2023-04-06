export interface ITag {
    id:string;
    tagName:string;
}

export interface IItinerary{
    id:string;
    title:string;
    subtitle:string;
    tags?: ITag[];
    startTime: Date;
    endTime: Date;
    location:string;
    endLocation?:string;
    cost?:number;
}

export interface ITrip {
    country:string;
    description:string;
    itinerary_id:string;
    name:string;
    trip_end:Date;
    trip_start:Date;
    user_id:string;
}

export interface ILoginRequest {
    userEmail:string;
    userPassword:string;
}

export interface ILoginRequest {
    userEmail:string;
    userPassword:string;
    userName:string;
    userNumber:string;
}

export interface IError {
    message:string;
    additional_info?: {}
}

export interface IAuthResult {
    result: string;
    additional_info?: {}
}