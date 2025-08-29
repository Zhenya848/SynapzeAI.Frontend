import { toast } from "react-toastify";
import { Test } from "../../entities/test/Test";
import { sendToAI } from "../../shared/AI/SendToAI";
import { AIResponse } from "./model/AIResponse";
import { tryGetTypeFromString } from "../../shared/helpers/TryGetTypeFromString";

export async function generateTestWithAI(
    Theme: string,
    IsTimeLimited: boolean,
    PercentOfOpenTasks: number,
    TasksCount?: number | null,
    Difficulty?: number | null,
    Seconds?: number | null,
    Minutes?: number | null,
    FilePath?: string | null
): Promise<Test | undefined>
{
    try {
        const testFormat = "{\n  \"testName\": \"string\",\n  \"theme\": \"string\",\n  " +
            "\n  \"limitTime\": {\n    \"seconds\": number,\n    " +
            "\"minutes\": number\n  },\n  " +
            "\"tasks\": [\n    {\n      \"taskName\": \"string\",\n      " +
            "\"taskMessage\": \"string\",\n      \"rightAnswer\": \"string\",\n      " +
            "\"answers\": [\n        \"string\"\n      ]\n    }\n  ]\n}";

        const request = `Сгенерируй тест по формату json: ${testFormat}. ` +
            `Тема теста: ${Theme}, ` +
            `Сложность: ${Difficulty === null ? "на выбор" : `${Difficulty}%`}, ` +
            `поле limitTime: ${(Seconds !== null && Minutes !== null) || IsTimeLimited ? "добавлять" : "не добавлять"}, ` +
            `${(Seconds !== null && Minutes !== null) ? `секунд: ${Seconds}, минут: ${Minutes}, ` : ""}` +
            `количество задач: ${TasksCount !== null ? TasksCount : "не ограничено"}, ` +
            `Процент открытых задач: ${PercentOfOpenTasks}. ` +
            `Задачи не обязательно должны иметь answers или rightAnswer, если это задачи открытого типа. Спецсимволы не используй.`;

        const response = await sendToAI(request, FilePath ?? undefined);
        const data: AIResponse = await response.json();
        const message = data.choices ? data.choices[0].message.content : "none";

        const test = tryGetTypeFromString(message, false) as Test;

        return test;
    }
    catch (error) {
        console.error(error);

        toast.error("Не удалось сгенерировать викторину");
    }
}