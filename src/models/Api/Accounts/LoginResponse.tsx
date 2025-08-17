import { UserInfo } from "./UserInfo";

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    user: UserInfo;
}