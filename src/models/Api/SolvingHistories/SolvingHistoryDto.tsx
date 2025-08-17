import { TaskHistoryDto } from "./TaskHistoryDto";

export type SolvingHistoryDto = {
    id: string;
    testId: string;

    uniqueUserName: string;
    userEmail: string;
    
    taskHistories: TaskHistoryDto[]
    solvingDate: Date
    solvingTimeSeconds: number
}