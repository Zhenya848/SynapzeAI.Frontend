import { TaskStatisticDto } from "./TaskStatisticDto"

export type TaskDto = {
    id: string
    testId: string
    
    taskName: string
    taskMessage: string
    rightAnswer?: string
    
    imagePath?: string
    audioPath?: string
    
    taskStatistic?: TaskStatisticDto
    nextReview?: string
    
    answers?: string[]
}