import { TaskDto } from "../Dtos/Tasks/TaskDto"

export type ChangedTask = {
    task: TaskDto
    changeType: ChangeType
}

enum ChangeType {
    created,
    updated,
    deleted
}