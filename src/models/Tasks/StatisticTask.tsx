import { TaskStatisticDto } from "../Dtos/Tasks/TaskStatisticDto"

export type StatisticTask = {
    taskIndex: number,
    priorityNumber: number,
    taskStatistic: TaskStatisticDto
}