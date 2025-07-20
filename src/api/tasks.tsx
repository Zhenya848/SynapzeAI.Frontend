import { CreateTaskDto } from "../models/Api/CreateTaskDto";
import { Envelope } from "../models/Envelope";
import { api } from "./api";

const TESTS_SERVICE_API_URL:string = "http://localhost:5095/api/Test/";

export class Tasks {
    static async delete(testId: string, taskIds: string[]) {
        return api.delete<Envelope<string[]>>(TESTS_SERVICE_API_URL + `${testId}/task`, { data: { taskIds } })
    }

    static async create(testId: string, tasks: CreateTaskDto[]) {
        return api.post<Envelope<string[]>>(TESTS_SERVICE_API_URL + `${testId}/task`, { tasks })
    }
}