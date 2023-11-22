import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import { Position } from "@rnmapbox/maps/lib/typescript/types/Position";

export type Place = Position;

export interface NearbyPlaceList {
  type: string;
  features: PlaceItem[];
}

export interface PlaceItem {
  type: string;
  id: number;
  geometry: {
    type: string;
    coordinates: Coordinates;
  };
  properties: {
    address: string;
    description: string;
    imgUrl: string;
    latitude: number;
    longitude: number;
    name: string;
    openDays: string;
    openHours: string;
    rating: number;
    target: string;
    place_id: string;
    title: string;
    tilequery: {
      distance: number;
      geometry: string;
      layer: string;
    };
  };
}

export interface PlaceResponse {
  data: PlaceDetail;
}

export interface PlaceDetail {
  _id: string;

  name: string;

  place_id: string;

  phone: string;

  website: string;

  operating_hours: Record<string, string>;

  thumbnail: string;

  images: string[];

  latitude: number;

  longitude: number;

  latitudeDelta: number;

  longtitudeDelta: number;

  rating: number;

  category: string;

  reviews: number;

  viewCount: number;

  service_options: Record<string, boolean>;

  province: string;

  city: string;
}

export interface TripPlace {
  images: string[];
  operating_hours: any; // Replace any with the actual type when available
  service_options: any; // Replace any with the actual type when available
  _id: string;
  name: string;
  place_id: string;
  phone: string;
  website: string;
  thumbnail: string;
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  rating: number;
  category: string;
  reviews: number;
  viewCount: number;
  province: string;
  city: string;
}

export interface Trip {
  places: Place[];
  participates: string[];
  _id: string;
  authorId: string;
  title: string;
  startDate: string;
  endDate: string;
  vehicle: string;
  viewCount: number;
  isDraft: boolean;
  isPublish: boolean;
}
