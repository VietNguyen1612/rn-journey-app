import axios from "axios";
import { User } from "../../types/user";
import { useQuery } from "@tanstack/react-query";

export interface FriendRequestInterface {
    _id: string,
    recipient: User,
    requester: User,
    status: Number,
    createdAt: Date
}

export const sendFriendRquest = async (token: string,
    recipient: string
): Promise<{ status: Number } | undefined> => {
    try {
        const { data } = await axios.post<{ status: Number }>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/friend/send?recipient=${recipient}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return data;
    } catch (error) { }
};

export const acceptFriend = async (token: string,
    requester: string
) => {
    try {
        const { data } = await axios.post<{ status: Number }>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/friend/make?requester=${requester}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    } catch (error) { }
};

export const rejectFriend = async (token: string,
    recipient: string
): Promise<{ status: Number } | undefined> => {
    try {
        const { data } = await axios.post<{ status: Number }>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/friend/send?recipient=${recipient}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return data;
    } catch (error) { }
};

export const useAllFriendRequest = (token: string) => {
    const queryFn = async () => {
        const { data } = await axios.get<Array<FriendRequestInterface>>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/friend`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return data;
    };
    return useQuery({
        queryKey: ["friend-request-list"],
        queryFn,
    });
};

export const useAllFriend = (token: string) => {
    const queryFn = async () => {
        const { data } = await axios.get<Array<FriendRequestInterface>>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/friend`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return data;
    };
    return useQuery({
        queryKey: ["friend-request-list"],
        queryFn,
    });
};