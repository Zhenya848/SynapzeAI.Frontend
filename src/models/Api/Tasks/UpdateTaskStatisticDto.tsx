import { TaskStatisticDto } from "./TaskStatisticDto";

export type UpdateTaskStatisticDto = {
    taskId: string;
    statistic: TaskStatisticDto
}