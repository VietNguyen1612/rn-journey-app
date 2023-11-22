import axios from "axios";
import { Trip } from "../../types/trip";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../types/user";

export interface GetAllTripPlanResponse {
    data: Trip[];
}
export interface GetTripDetailResponse {
    data: Trip;
}

export const createTripPlanByArchiveId = async (
    token: string,
    title: string,
    friendList: User[],
    archiveId: string
) => {
    try {
        const participates = friendList.map(item => { return { id: item._id, avatarUrl: item.avatarUrl, username: item.username } })
        const body = {
            title,
            participates
        }

        const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/trip/create?archiveId=${archiveId}`,
            body,
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

export const useAllTripPlan = (token: string) => {
    const queryFn = async () => {
        const { data } = await axios.get<GetAllTripPlanResponse>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/trip`,
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
        queryKey: ["trip-list"],
        queryFn,
    });
};

export const useTripDetail = (token: string, tripId: string) => {
    const queryFn = async () => {

        const { data } = await axios.get<GetTripDetailResponse>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/trip/${tripId}`,
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
        queryKey: ["trip-detail"],
        queryFn,
    });
};



