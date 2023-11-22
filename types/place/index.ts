export interface Place {
  _id: string;
  name: string;
  placeId: string;
  phone?: string;
  website?: string;
  operating_hours?: Record<string, string>;
  thumbnail: string;
  images: string[];
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longtitudeDelta?: number;
  rating: number;
  category: string;
  reviews: number;
  viewCount: number;
  service_options?: Record<string, boolean>;
  province: string;
  city?: string;
}

export interface AllPlacesResponse {
  data: Place[]
}
