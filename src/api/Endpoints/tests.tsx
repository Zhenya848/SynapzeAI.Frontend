import { CreateTaskDto } from "../../models/Api/Tasks/CreateTaskDto";
import { UpdateTaskDto } from "../../models/Api/Tasks/UpdateTaskDto";
import { TestDto } from "../../models/Api/Tests/TestDto";
import { Envelope } from "../../models/Api/Envelope";
import { api } from "../api";
import { UpdateTaskStatisticDto } from "../../models/Api/Tasks/UpdateTaskStatisticDto";
import { PageList } from "../../models/Api/Tests/PageList";
import { GlobalTestDto } from "../../models/Api/Tests/GlobalTestDto";
import { UserInfo } from "../../models/Api/Accounts/UserInfo";

const TESTS_SERVICE_API_URL:string = "http://localhost:5095/api/Test/";

export class Tests {
    static async get(userId: string) {
        return api.get<Envelope<TestDto[]>>(TESTS_SERVICE_API_URL + userId)
    }

    static async getWithPagination(page: number, pageSize: number, userData?: UserInfo, searchTestName?: string, searchTestTheme?: string, searchUserEmail?: string, orderBy?: string) {
        return api.post<Envelope<PageList<GlobalTestDto>>>(TESTS_SERVICE_API_URL + "tests", { page, pageSize, userData, searchTestName, searchTestTheme, searchUserEmail, orderBy })
    }

    static async delete(userId: string, testId: string) {
        return api.delete<string>(TESTS_SERVICE_API_URL + `${userId}/${testId}`);
    }

    static async update(userId: string, testId: string, testName: string, theme: string, withAI: boolean, seconds?: number, minutes?:number, 
        isPrivate?: boolean, usersNamesAreAllowed?: string[], usersEmailsAreAllowed?: string[], tasksToCreate?: CreateTaskDto[], tasksToUpdate?: UpdateTaskDto[], taskIdsToDelete?: string[]) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + `${userId}/${testId}`, { testName, theme, withAI, seconds, minutes, isPrivate, usersNamesAreAllowed, usersEmailsAreAllowed, tasksToCreate, tasksToUpdate, taskIdsToDelete})
    }

    static async create(userId: string, testName: string, theme: string, withAI: boolean, tasks?: CreateTaskDto[], seconds?: number, minutes?: number, 
        isPrivate?: boolean, usersNamesAreAllowed?: string[], usersEmailsAreAllowed?: string[]) {
        return api.post<Envelope<string>>(TESTS_SERVICE_API_URL + userId, { testName, theme, withAI, seconds, minutes, isPrivate, usersNamesAreAllowed, usersEmailsAreAllowed, tasks })
    }

    static async createWithAI(userId: string, theme: string, isTimeLimited: boolean, percentOfOpenTasks: number, tasksCount?: number, difficulty?: number, seconds?: number, minutes?: number) {
        return api.post<Envelope<string>>(TESTS_SERVICE_API_URL + userId + "/withAI", { theme, isTimeLimited, percentOfOpenTasks, tasksCount, difficulty, seconds, minutes })
    }

    static async updateTasksStatistic(testId: string, tasks: UpdateTaskStatisticDto[]) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + `${testId}/task`, { tasks })
    }
}