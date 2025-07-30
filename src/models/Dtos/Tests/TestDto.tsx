import { LimitTimeDto } from "./LimitTimeDto"
import { TaskDto } from "../Tasks/TaskDto"

export type TestDto = {
    id: string
    userId: string
    
    testName: string
    theme: string
    withAI: boolean

    limitTime?: LimitTimeDto
    
    tasks: TaskDto[]
}