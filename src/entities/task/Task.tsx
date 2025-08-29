import { TaskStatistic } from "../taskStatistic/TaskStatistic"

export type Task = {
    id: string
    testId: string
    
    serialNumber: number,
    taskName: string
    taskMessage: string
    rightAnswer?: string
    
    taskStatistic?: TaskStatistic
    
    answers?: string[]
}