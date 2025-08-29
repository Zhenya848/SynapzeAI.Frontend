import { Task } from "../task/Task"
import { LimitTime } from "../valueObjects/LimitTime"

export type Test = {
    id: string
    userId: string

    uniqueUserName: string
    
    testName: string
    theme: string

    isPublished: boolean
    isSaved: boolean

    limitTime?: LimitTime
    
    tasks: Task[]
}