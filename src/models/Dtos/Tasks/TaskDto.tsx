import { TaskStatisticDto } from "./TaskStatisticDto"

export type TaskDto = {
    id: string
    testId: string
    
    serialNumber: number,
    taskName: string
    taskMessage: string
    rightAnswer?: string
    
    imagePath?: string
    audioPath?: string
    
    taskStatistic?: TaskStatisticDto
    
    answers?: string[]
}