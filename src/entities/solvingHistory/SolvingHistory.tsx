import { TaskHistory } from "../taskHistory/TaskHistory";

export type SolvingHistory = {
    id: string;
    testId: string;

    uniqueUserName: string;
    userTelegram: string;
    
    taskHistories: TaskHistory[]
    solvingDate: Date
    solvingTimeSeconds: number
}