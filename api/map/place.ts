import axios from "axios";
import { Place, PlaceItem, NearbyPlaceList, PlaceResponse } from "../../types/map";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AllPlacesResponse } from "../../types/place";

export const getExactPlace = async (
  position: Place,
  radius = 20,
  limit = 1
): Promise<PlaceItem | undefined> => {
  try {

    const { data } = await axios.get<NearbyPlaceList>(
      `https://api.mapbox.com/v4/sangtran127.9a8f5hvh/tilequery/${position[0]},${position[1]}.json?radius=${radius}&limit=${limit}&dedupe=&access_token=${process.env.EXPO_PUBLIC_MAPBOX_API}`
    );

    if (data.features.length < 1) {
      return undefined;
    }

    return data.features[0];
  } catch (error) {
    throw error;
  }
};

export const getNearbyPlaces = async (
  position: Place,
  radius = 1000,
  limit = 50
): Promise<NearbyPlaceList> => {
  try {
    const { data } = await axios.get<NearbyPlaceList>(
      `https://api.mapbox.com/v4/sangtran127.9a8f5hvh/tilequery/${position[0]},${position[1]}.json?radius=${radius}&limit=${limit}&dedupe=&access_token=${process.env.EXPO_PUBLIC_MAPBOX_API}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const useQueryNearbyPlaces = (
  position: Place,
  radius = 1000,
  limit = 50
) => {
  const queryFn = async () => {
    const { data } = await axios.get<NearbyPlaceList>(
      `https://api.mapbox.com/v4/sangtran127.9a8f5hvh/tilequery/${position[0]},${position[1]}.json?radius=${radius}&limit=${limit}&dedupe=&access_token=${process.env.EXPO_PUBLIC_MAPBOX_API}`
    );
    return data;
  };
  return useQuery({
    queryKey: ["nearby-places", position],
    queryFn,
  });
};

export const useQueryDetailPlace = (
  placeId: string, token: string
) => {
  const queryFn = async () => {
    // console.log(`http://localhost:4000/place/${placeId}`);

    const { data } = await axios.get<PlaceResponse>(

      `${process.env.EXPO_PUBLIC_BACKEND_API}/place/${placeId}`,
      { 'headers': { 'Authorization': 'Bearer ' + token } }
    );

    return data.data;
  };
  return useQuery({
    queryKey: ["detail-place", placeId],
    queryFn,
  });
};

export const useQueryAllPlacesPagination = (
  token: string,
  pageSize: number,
  placeId: string | undefined
) => {
  const queryFn = async () => {
    // console.log(`http://localhost:4000/place/${placeId}`);
    const { data } = await axios.get<AllPlacesResponse>(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/place?pageSize=${pageSize}&placeId=${placeId}`,
      { 'headers': { 'Authorization': 'Bearer ' + token } }
    );
    // console.log(data)
    return data.data;
  };
  return useQuery({
    queryKey: ["all-places-pagination", pageSize, placeId],
    queryFn,
  });
};


