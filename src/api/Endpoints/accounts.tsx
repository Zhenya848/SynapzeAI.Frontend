import { AxiosResponse } from "axios";
import { Envelope } from "../../models/Api/Envelope";
import { LoginResponse } from "../../models/Api/Accounts/LoginResponse";
import { api } from "../api";
import { UserInfo } from "../../models/Api/Accounts/UserInfo";

const USER_SERVICE_API_URL:string = "http://localhost:5276/api/Account/";

export class Accounts {
    static async login(email: string, password: string) : Promise<AxiosResponse<Envelope<LoginResponse>>> {
        return api.post<Envelope<LoginResponse>>(USER_SERVICE_API_URL + "login", { email, password });
    }

    static async register(userName: string, email: string, password: string) {
        return api.post<Envelope<null>>(USER_SERVICE_API_URL + "registration", { userName, email, password });
    }

    static async refresh() {
        return api.post<Envelope<LoginResponse>>(USER_SERVICE_API_URL + "refresh");
    }

    static async logout() {
        return api.post(USER_SERVICE_API_URL + "logout");
    }

    static async getUsers(userIds: string[]) {
        return api.post<Envelope<UserInfo[]>>(USER_SERVICE_API_URL + "users", { userIds });
    }

    static async updateUser(userId: string, userName: string) {
        return api.put<Envelope<string>>(USER_SERVICE_API_URL + `users/${userId}`, { userName });
    }
}