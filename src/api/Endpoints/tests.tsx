import { CreateTaskDto } from "../../models/Api/Tasks/CreateTaskDto";
import { UpdateTaskDto } from "../../models/Api/Tasks/UpdateTaskDto";
import { TestDto } from "../../models/Api/Tests/TestDto";
import { Envelope } from "../../models/Api/Envelope";
import { api } from "../api";
import { UpdateTaskStatisticDto } from "../../models/Api/Tasks/UpdateTaskStatisticDto";
import { PageList } from "../../models/Api/Tests/PageList";

const TESTS_SERVICE_API_URL:string = "http://localhost:5144/api/Test/";

export class Tests {
    static async getTests(userId: string) {
        return api.get<Envelope<TestDto[]>>(TESTS_SERVICE_API_URL + userId + "/tests")
    }

    static async getTest(testId: string) {
        return api.get<Envelope<TestDto>>(TESTS_SERVICE_API_URL + testId + "/test")
    }

    static async getWithPagination(page: number, pageSize: number, userId?: string, searchTestName?: string, searchTestTheme?: string, searchUserName?: string, orderBy?: string) {
        return api.post<Envelope<PageList<TestDto>>>(TESTS_SERVICE_API_URL + "tests", { page, pageSize, searchTestName, searchTestTheme, searchUserName, orderBy, userId })
    }

    static async delete(userId: string, testId: string) {
        return api.delete<string>(TESTS_SERVICE_API_URL + `${userId}/${testId}`);
    }

    static async update(userId: string, testId: string, uniqueUserName: string, testName: string, theme: string, isPublished: boolean, seconds?: number, minutes?:number, tasksToCreate?: CreateTaskDto[], tasksToUpdate?: UpdateTaskDto[], taskIdsToDelete?: string[]) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + `${userId}/${testId}`, { uniqueUserName, testName, theme, isPublished, seconds, minutes, tasksToCreate, tasksToUpdate, taskIdsToDelete})
    }

    static async create(userId: string, uniqueUserName: string, testName: string, theme: string, isPublished: boolean, tasks?: CreateTaskDto[], seconds?: number, minutes?: number) {
        return api.post<Envelope<string>>(TESTS_SERVICE_API_URL + userId, { testName, uniqueUserName, theme, isPublished, seconds, minutes, tasks })
    }

    static async createWithAI(userId: string, uniqueUserName: string, theme: string, isTimeLimited: boolean, percentOfOpenTasks: number, tasksCount?: number, difficulty?: number, seconds?: number, minutes?: number) {
        return api.post<Envelope<string>>(TESTS_SERVICE_API_URL + userId + "/withAI", { uniqueUserName, theme, isTimeLimited, percentOfOpenTasks, tasksCount, difficulty, seconds, minutes })
    }

    static async updateTasksStatistic(userId:string, testId: string, tasks: UpdateTaskStatisticDto[]) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + `${userId}/${testId}/tasksStatistic`, { tasks })
    }
}