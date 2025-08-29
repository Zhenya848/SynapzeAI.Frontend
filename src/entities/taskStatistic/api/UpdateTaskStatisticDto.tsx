export type UpdateTaskStatisticDto = {
    taskId: string;
    errorsCount: number
    rightAnswersCount: number
    lastReviewTime: Date
    avgTimeSolvingSec: number
}