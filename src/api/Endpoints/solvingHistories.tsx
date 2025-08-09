import { Envelope } from "../../models/Accounts/Envelope";
import { AIMessageForTask } from "../../models/Api/SolvingHistories/AIMessageForTask";
import { SolvingHistoryDto } from "../../models/Dtos/SolvingHistories/SolvingHistoryDto";
import { TaskHistoryDto } from "../../models/Dtos/SolvingHistories/TaskHistoryDto";
import { api } from "../api";

const TESTS_SERVICE_API_URL:string = "http://localhost:5095/api/Test/";

export class SolvingHistories {
    static async create(testId: string, taskHistories: TaskHistoryDto[], solvingDate: Date, solvingTimeSeconds: number) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + `${testId}/history`, { taskHistories, solvingDate, solvingTimeSeconds })
    }

    static async get(testId: string) {
        return api.get<Envelope<SolvingHistoryDto[]>>(TESTS_SERVICE_API_URL + `${testId}/history`)
    }

    static async explainSolvingTest(testId: string, solvingHistoryId: string) {
        return api.put<Envelope<AIMessageForTask[]>>(TESTS_SERVICE_API_URL + `${testId}/history/explain/${solvingHistoryId}`)
    }
}