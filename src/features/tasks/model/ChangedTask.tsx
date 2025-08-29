import { Task } from "../../../entities/task/Task"

export type ChangedTask = {
    task: Task
    changeType: ChangeType
}

enum ChangeType {
    created,
    updated,
    deleted
}