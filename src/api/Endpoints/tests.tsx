import { CreateTaskDto } from "../../models/Api/Tasks/CreateTaskDto";
import { UpdateTaskDto } from "../../models/Api/Tasks/UpdateTaskDto";
import { TestDto } from "../../models/Dtos/Tests/TestDto";
import { Envelope } from "../../models/Accounts/Envelope";
import { api } from "../api";
import { UpdateTaskStatisticDto } from "../../models/Api/Tasks/UpdateTaskStatisticDto";
import { number } from "framer-motion";
import { LimitTimeDto } from "../../models/Dtos/Tests/LimitTimeDto";

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

    static async update(testId: string, testName: string, theme: string, isPublished: boolean, seconds?: number, minutes?:number, 
        tasksToCreate?: CreateTaskDto[], tasksToUpdate?: UpdateTaskDto[], taskIdsToDelete?: string[]) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + testId, { testName, theme, isPublished, seconds, minutes, tasksToCreate, tasksToUpdate, taskIdsToDelete})
    }

    static async create(userId: string, testName: string, theme: string, isPublished: boolean, tasks?: CreateTaskDto[], seconds?: number, minutes?: number) {
        return api.post<Envelope<string>>(TESTS_SERVICE_API_URL + userId, { testName, theme, isPublished, seconds, minutes, tasks })
    }

    static async createWithAI(userId: string, theme: string, isTimeLimited: boolean, percentOfOpenTasks: number, tasksCount?: number, difficulty?: number, seconds?: number, minutes?: number) {
        return api.post<Envelope<string>>(TESTS_SERVICE_API_URL + userId + "/withAI", { theme, isTimeLimited, percentOfOpenTasks, tasksCount, difficulty, seconds, minutes })
    }

    static async updateTasksStatistic(testId: string, tasks: UpdateTaskStatisticDto[]) {
        return api.put<Envelope<string>>(TESTS_SERVICE_API_URL + `${testId}/task`, { tasks })
    }
}