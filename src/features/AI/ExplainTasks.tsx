import { AIMessageForTask } from "../../entities/solvingHistory/api/AIMessageForTask";
import { TaskHistory } from "../../entities/taskHistory/TaskHistory";
import { sendToAI } from "../../shared/AI/SendToAI";
import { tryGetTypeFromString } from "../../shared/helpers/TryGetTypeFromString";
import { AIResponse } from "./model/AIResponse";

export async function explainTasks(taskHistories: TaskHistory[]): Promise<AIMessageForTask[] | undefined> {
    try {
        const aiMessageForTaskJsonFormat: AIMessageForTask[] = [{ taskSerialNumber: 1, aiMessage: "YourText"}] as AIMessageForTask[];

        const request = `История решения задач представлена в формате json: ${JSON.stringify(taskHistories)}. ` +
            "Цель: проанализировать каждую задачу и ответ пользователя к ней " +
            `и вернуть сообщение в формате json: ${JSON.stringify(aiMessageForTaskJsonFormat)}. `;

        const response = await sendToAI(request);
        const data: AIResponse = await response.json();
        const message = data.choices ? data.choices[0].message.content : "none";

        console.log(message);

        const aiMessagesForTasks = tryGetTypeFromString(message, true) as AIMessageForTask[];

        return aiMessagesForTasks;
    }
    catch (e) {
        console.error(e)
    }
}