import axios from "axios";
import { Everyone } from "../../types/user";

export const searchByPhone = async (token: string,
    phoneNumber: string
): Promise<Everyone | undefined> => {
    try {
        const { data } = await axios.get<Everyone>(
            `${process.env.EXPO_PUBLIC_BACKEND_API}/user/search?q=${phoneNumber}`,
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