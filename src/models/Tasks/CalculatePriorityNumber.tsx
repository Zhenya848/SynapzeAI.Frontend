import { TaskStatisticDto } from "../Dtos/Tasks/TaskStatisticDto";

export function calculatePriorityNumber(taskStatistic?: TaskStatisticDto): number {
    if (!taskStatistic) 
        return 1;

    const now = new Date();
    const lastReview = new Date(taskStatistic.lastReviewTime);

    const totalAttempts = taskStatistic.errorsCount + taskStatistic.rightAnswersCount;
    const errorRate = taskStatistic.errorsCount / (totalAttempts + 0.01);

    const attemptFactor = 1 / (Math.sqrt(totalAttempts) + 0.01);

    const daysSinceLastReview = (now.getTime() - lastReview.getTime()) / (1000 * 60 * 60 * 24);
    const forgettingCurveFactor = 1 - Math.exp(-daysSinceLastReview / 7);

    const timeSpentFactor = taskStatistic.avgTimeSolvingSec / 30;
    const timePriority = 0.3 * Math.min(2, timeSpentFactor);

    const priority = (
        0.6 * errorRate +
        0.4 * attemptFactor +
        0.8 * forgettingCurveFactor +
        timePriority
    );

    return Math.max(0, Math.min(1, priority));
}