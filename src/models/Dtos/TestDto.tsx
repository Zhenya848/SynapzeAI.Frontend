import { LimitTimeDto } from "../LimitTimeDto"
import { TaskDto } from "./TaskDto"

export type TestDto = {
    id: string
    userId: string
    
    testName: string
    theme: string
    isPublished: boolean

    limitTime?: LimitTimeDto
    
    tasks: TaskDto[]
}