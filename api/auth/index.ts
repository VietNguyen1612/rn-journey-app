import axios from "axios";
import { AuthUser } from "../../types/user";

export interface UserLoginRequest {
  phone: string;
  password: string;
}
export interface UserRegisterRequest {
  phone: string;
  password: string;
  repeatPassword: string;
}

export const login = async (
  request: UserLoginRequest
): Promise<AuthUser | undefined> => {
  try {
    const { data } = await axios.post<AuthUser>(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/auth/login`,
      {
        usernameOrPhone: request.phone,
        password: request.password,
        type: "phone",
      }
    );
    return data;
  } catch (error) { }
};

export const register = async (
  request: UserRegisterRequest
): Promise<AuthUser | undefined> => {
  try {
    const { data } = await axios.post<AuthUser>(
      `${process.env.EXPO_PUBLIC_BACKEND_API}/auth/register`,
      {
        phoneNumber: request.phone,
        password: request.password,
      }
    );
    return data;
  } catch (error) { }
};
