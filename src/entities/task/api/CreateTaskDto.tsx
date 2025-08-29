export type CreateTaskDto = {
    taskName: string,
    taskMessage: string,
    rightAnswer?: string,
    answers?: string[]
}