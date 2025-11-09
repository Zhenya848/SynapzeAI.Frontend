import { UpdateTaskHistoryDto } from "../../entities/solvingHistory/api/UpdateTaskHistoryDto";
import { TaskHistory } from "../../entities/taskHistory/TaskHistory";
import { sendToAI } from "../../shared/AI/SendToAI";
import { tryGetTypeFromString } from "../../shared/helpers/TryGetTypeFromString";
import { AIResponse } from "./model/AIResponse";

export async function explainTasks(taskHistories: TaskHistory[]): Promise<UpdateTaskHistoryDto[] | undefined> {
    try {
        const task: UpdateTaskHistoryDto[] = [{ serialNumber: 1, message: "YourText", points: 100}] as UpdateTaskHistoryDto[];

        const request = `История решения задач представлена в формате json: ${JSON.stringify(taskHistories)}. ` +
            "Цель: проанализировать каждую задачу и ответ пользователя к ней, объяснить почему тот или иной ответ верный / неверный " +
            `, вернуть сообщение в формате json: ${JSON.stringify(task)} и поставить оценку от 0 до 100 каждому ответу`;

        const response = await sendToAI(request);
        const data: AIResponse = await response.json();
        const message = data.choices ? data.choices[0].message.content : "none";

        const aiMessagesForTasks = tryGetTypeFromString(message, true) as UpdateTaskHistoryDto[];

        return aiMessagesForTasks;
    }
    catch (e) {
        console.error(e)
    }
}