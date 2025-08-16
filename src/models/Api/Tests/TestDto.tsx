import { TaskDto } from "../Tasks/TaskDto"
import { LimitTimeDto } from "./LimitTimeDto"

export type TestDto = {
    id: string
    userId: string

    uniqueUserName: string
    
    testName: string
    theme: string
    isPublished: boolean

    limitTime?: LimitTimeDto
    
    tasks: TaskDto[]
}