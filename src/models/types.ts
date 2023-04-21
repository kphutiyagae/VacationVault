export interface ITag {
  id: string;
  tagName: string;
}

export interface IItinerary {
  id: string;
  title: string;
  subtitle: string;
  tags?: ITag[];
  startTime: Date;
  endTime: Date;
  location: string;
  endLocation?: string;
  cost?: number;
}

export interface ITrip {
  country: string;
  description: string;
  itinerary_id: string;
  name: string;
  trip_end: Date;
  trip_start: Date;
  user_id: string;
  trip_id?: string;
}

export interface ILoginRequest {
  userEmail: string;
  userPassword: string;
}

export interface ILoginRequest {
  userEmail: string;
  userPassword: string;
  userName: string;
  userNumber: string;
}

export interface IError {
  message: string;
  additional_info?: {};
}
export interface IUserCredential {
  user_id: string;
  user_JWT: Promise<unknown> | string;
}

export interface IAuthResult {
  result: string;
  additional_info?: IUserCredential;
}

export interface IItem {
  cost: number;
  currency: string;
  item_date_end?: string;
  item_time_end?: string;
  item_date_start?: string;
  item_time_start?: string;
  description?: string;
  end_location?: { latitude: number; longitude: number };
  notes?: string;
  start_location?: { latitude: number; longitude: number };
  tags?: string[];
  title: string;
  trip_id: string;
  item_id?: string;
}

export interface ICurrencyAPIResponse {
  motd: Motd;
  success: boolean;
  query: Query;
  info: Info;
  historical: boolean;
  date: string;
  result: number;
}

export interface Motd {
  msg: string;
  url: string;
}

export interface Query {
  from: string;
  to: string;
  amount: number;
}

export interface Info {
  rate: number;
}

export interface ICurrencyObject {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}
