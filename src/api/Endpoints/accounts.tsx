import { AxiosResponse } from "axios";
import { Envelope } from "../../models/Accounts/Envelope";
import { LoginResponse } from "../../models/Accounts/LoginResponse";
import { api } from "../api";

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
}