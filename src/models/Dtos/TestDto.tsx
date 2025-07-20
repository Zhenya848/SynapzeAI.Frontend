import { LimitTimeDto } from "../LimitTimeDto"
import { TaskDto } from "./TaskDto"

export type TestDto = {
    Id: string
    UserId: string
    
    TestName: string
    Theme: string
    IsPublished: boolean

    LimitTime?: LimitTimeDto
    
    Tasks: TaskDto[]
}