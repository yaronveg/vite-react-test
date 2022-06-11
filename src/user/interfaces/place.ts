import { IdType } from "./general";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: IdType;
  title: string;
  address: string;
  description: string;
  imageUrl: string;
  location: Coordinates;
  creator: IdType;
}
