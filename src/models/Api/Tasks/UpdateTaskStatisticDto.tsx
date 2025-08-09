import { TaskStatisticDto } from "../../Dtos/Tasks/TaskStatisticDto";

export type UpdateTaskStatisticDto = {
    taskId: string;
    statistic: TaskStatisticDto
}