import { Envelope } from "../../models/Api/Envelope";
import { AIMessageForTask } from "../../models/Api/SolvingHistories/AIMessageForTask";
import { SolvingHistoryDto } from "../../models/Api/SolvingHistories/SolvingHistoryDto";
import { TaskHistoryDto } from "../../models/Api/SolvingHistories/TaskHistoryDto";
import { PageList } from "../../models/Api/Tests/PageList";
import { api } from "../api";

const TESTS_SERVICE_API_URL:string = "http://localhost:5144/api/Test/";

export class SolvingHistories {
    static async create(uniqueUserName: string, userEmail: string, testId: string, taskHistories: TaskHistoryDto[], solvingDate: Date, solvingTimeSeconds: number) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + `${testId}/history`, { uniqueUserName, userEmail, taskHistories, solvingDate, solvingTimeSeconds })
    }

    static async getWithPagination(page: number, pageSize: number, testId: string, searchUserName?: string, searchUserEmail?: string) {
        console.log(page, pageSize, testId, searchUserName, searchUserEmail)

        return api.post<Envelope<PageList<SolvingHistoryDto>>>(TESTS_SERVICE_API_URL + `${testId}/history`, { page, pageSize, searchUserName, searchUserEmail })
    }

    static async explainSolvingTest(testId: string, solvingHistoryId: string) {
        return api.put<Envelope<AIMessageForTask[]>>(TESTS_SERVICE_API_URL + `${testId}/history/explain/${solvingHistoryId}`)
    }
}