import { User } from "../User";

export type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}