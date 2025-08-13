import { TaskDto } from "../Tasks/TaskDto"
import { LimitTimeDto } from "./LimitTimeDto"
import { PrivacySettingsDto } from "./PrivacySettingsDto"

export type TestDto = {
    id: string
    userId: string
    
    testName: string
    theme: string
    withAI: boolean

    limitTime?: LimitTimeDto

    privacySettings: PrivacySettingsDto
    
    tasks: TaskDto[]
}