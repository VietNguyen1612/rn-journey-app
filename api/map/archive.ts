import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Archive, ArchiveDetail } from "../../types/archive";

export interface GetAllArchiveResponse {
  data: Archive[];
}

export interface GetArchiveDetailResponse {
  data: ArchiveDetail;
}

export const useAllArchive = (token: string) => {
  const queryFn = async () => {

    const { data } = await axios.get<GetAllArchiveResponse>(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/archive`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data.data;
  };
  return useQuery({
    queryKey: ["archive-list"],
    queryFn,
  });
};

export const useArchiveDetail = (token: string, archiveId: string) => {
  const queryFn = async () => {
    const { data } = await axios.get<GetArchiveDetailResponse>(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/archive/${archiveId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data.data;
  };
  return useQuery({
    queryKey: [`archive-${archiveId}`],
    queryFn,
  });
};

export const addPlaceToArchive = async (
  token: string,
  placeId: string,
  archiveId: string
) => {
  try {
    if (!placeId) return
    // console.log(placeId);

    const { data } = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/archive/add/${archiveId}`,
      { placeId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const createArchive = async (
  token: string,
  title: string,
) => {
  try {

    const { data } = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/archive/create`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
};
