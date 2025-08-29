export type UpdateTaskDto = {
    taskId: string;
    taskName: string,
    taskMessage: string,
    rightAnswer?: string,
    answers?: string[]
}