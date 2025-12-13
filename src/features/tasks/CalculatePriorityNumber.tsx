import { TaskStatistic } from "../../entities/taskStatistic/TaskStatistic";

export function calculatePriorityNumber(taskStatistic?: TaskStatistic): number {
    /*if (!taskStatistic) 
        return 1;

    const now = new Date();
    const lastReview = new Date(taskStatistic.lastReviewTime);

    const totalAttempts = taskStatistic.errorsCount + taskStatistic.rightAnswersCount;
    const errorRate = taskStatistic.errorsCount / (totalAttempts + 0.01);

    const attemptFactor = 1 / (Math.sqrt(totalAttempts) + 0.01);

    const daysSinceLastReview = (now.getTime() - lastReview.getTime()) / (60 * 60 * 24);
    const forgettingCurveFactor = 1 - Math.exp(-daysSinceLastReview / 7);

    const timeSpentFactor = Math.min(2, taskStatistic.avgTimeSolvingSec / 30);

    const priority = (
        0.6 * errorRate +
        0.4 * attemptFactor +
        0.3 * forgettingCurveFactor +
        0.3 * timeSpentFactor
    );*/

    if (!taskStatistic) 
        return 1;

    const baseStability = 10;

    let speedFactor = 10 / (taskStatistic.avgTimeSolvingSec || 10);
    speedFactor = Math.min(speedFactor, 2.0);

    const rightAnswers = taskStatistic.rightAnswersCount;
    const wrongAnswers = taskStatistic.errorsCount;
    const total = rightAnswers + wrongAnswers;

    const accuracyFactor = Math.pow((total > 0 ? rightAnswers / total : 0), 2);

    const stability = baseStability * accuracyFactor * speedFactor * 10;
    
    const now = new Date();
    const lastReview = new Date(taskStatistic.lastReviewTime);
    
    const minutesSinceLastReview = Math.max(((now.getTime() - lastReview.getTime()) / 1000) / 60, 0.1);

    const priority = 1 - Math.exp(-minutesSinceLastReview / stability);

    return priority
}