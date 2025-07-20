import { CreateTaskDto } from "../models/Api/CreateTaskDto";
import { TestDto } from "../models/Dtos/TestDto";
import { Envelope } from "../models/Envelope";
import { api } from "./api";

const TESTS_SERVICE_API_URL:string = "http://localhost:5095/api/Test/";

export class Tests {
    static async get(userId: string) {
        return api.get<Envelope<TestDto[]>>(TESTS_SERVICE_API_URL + userId)
    }

    static async delete(testId: string) {
        return api({
            method: 'delete',
            url: TESTS_SERVICE_API_URL + testId
        });
    }

    static async update(testId: string, testName: string, theme: string, isPublished: boolean, seconds?: number, minutes?:number) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + testId, { testName, theme, isPublished, seconds, minutes })
    }

    static async create(userId: string, testName: string, theme: string, isPublished: boolean, tasks?: CreateTaskDto[], seconds?: number, minutes?: number) {
        return api.post<Envelope<string>>(TESTS_SERVICE_API_URL + userId, { testName, theme, isPublished, seconds, minutes, tasks })
    }
}