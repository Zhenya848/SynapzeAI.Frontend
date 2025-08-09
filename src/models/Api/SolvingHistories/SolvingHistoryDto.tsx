import { TaskHistoryDto } from "../../Dtos/SolvingHistories/TaskHistoryDto";

export type SolvingHistoryDto = {
    id: string;
    testId: string
    
    taskHistories: TaskHistoryDto[]
    solvingDate: Date
    solvingTimeSeconds: number
}