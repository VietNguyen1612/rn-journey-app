export interface User {
  _id: string;
  avatarUrl: string;
  phoneNumber: string;
  isActive: true;
  otp: string;
  username: string;
  friends: Array<User>;
}

export interface AuthUser {
  user: User;
  expiresIn: string;
  accessToken: string;
  refreshToken: string;
  expireInRefresh: string;
}

export interface Everyone {
  _id: string;
  avatarUrl: string;
  phoneNumber: string;
  isActive: true;
  otp: string;
  username: string;
  friends: Array<string>;
  isFriend: boolean
}
