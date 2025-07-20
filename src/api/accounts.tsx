import { AxiosResponse } from "axios";
import { Envelope } from "../models/Envelope";
import { LoginResponse } from "../models/LoginResponse";
import { api } from "./api";
import { TestDto } from "../models/Dtos/TestDto";

const USER_SERVICE_API_URL:string = "http://localhost:5276/api/Account/";
const TESTS_SERVICE_API_URL:string = "https://localhost:7246/api/Test/";

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

export class Tests {
    static async get(userId: string) {
        return api.get<Envelope<TestDto[]>>(TESTS_SERVICE_API_URL + userId)
    }
}