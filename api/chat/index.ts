import axios from "axios";
import { User } from "../../types/user";
import { useQuery } from "@tanstack/react-query";


export interface RoomResponse {
    _id: string,
    name: string,
    users: {
        _id: string,
        avatarUrl: string,
        phoneNumber: string,
        username: string
    }[]
}

export const useQueryAllRoom = (
    token: string
) => {
    const queryFn = async () => {
        // console.log(`http://localhost:4000/place/${placeId}`);
        const { data } = await axios.get<RoomResponse[]>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/chat/room`,
            {
                'headers': {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json",
                }
            }
        );
        return data;
    };
    return useQuery({
        queryKey: ["all-room", token],
        queryFn,
    });
};