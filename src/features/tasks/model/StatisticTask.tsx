import { TaskStatistic } from "../../../entities/taskStatistic/TaskStatistic"

export type StatisticTask = {
    taskIndex: number,
    priorityNumber: number,
    taskStatistic: TaskStatistic
}