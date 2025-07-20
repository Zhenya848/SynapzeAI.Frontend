import { TaskDto } from "./Dtos/TaskDto"

export type ChangedTask = {
    task: TaskDto
    changeType: ChangeType
}

enum ChangeType {
    created,
    updated,
    deleted
}