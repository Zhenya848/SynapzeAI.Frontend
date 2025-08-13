import { TaskStatisticDto } from "../Api/Tasks/TaskStatisticDto"

export type StatisticTask = {
    taskIndex: number,
    priorityNumber: number,
    taskStatistic: TaskStatisticDto
}