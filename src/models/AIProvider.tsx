import { AIMessageForTask } from "./Api/SolvingHistories/AIMessageForTask";
import { TaskHistoryDto } from "./Api/SolvingHistories/TaskHistoryDto";
import { TestDto } from "./Api/Tests/TestDto";

interface AIResponse {
    choices?: {
        message: {
            content: string;
        };
    }[];
    error?: {
        message: string;
    };
}

export async function sendToAI(request: string, filePath?: string) { 
    return await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'google/gemini-2.5-flash-lite',
            messages: [
                {
                    role: 'user',
                    content: (filePath && filePath.startsWith('data:image/')
                    ? 
                    [
                        {
                            type: 'text',
                            text: request,
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: filePath,
                            },
                        }
                    ]
                    : filePath && filePath.startsWith('data:application/pdf')
                    ?
                    [
                        {
                            type: 'text',
                            text: request,
                        },
                        {
                            type: 'file',
                            file: {
                                filename: 'document.pdf',
                                file_data: filePath,
                            },
                        },
                    ]
                    :
                    [
                        {
                            type: 'text',
                            text: request,
                        }
                    ])
                }
            ],

            plugins: [
                {
                    id: 'file-parser',
                    pdf: {
                        engine: 'mistral-ocr'
                    },
                },
            ]
        }),
    });
}

function tryGetTypeFromString<T>(value: string, isCollection: boolean): T | undefined {
    try {
        const startIndex = value.indexOf(isCollection ? '[' : '{');
        const endIndex = value.lastIndexOf(isCollection ? ']' : '}');

        if (startIndex === -1 || endIndex === -1) {
            throw new Error("Invalid JSON structure");
        }

        const json = value.substring(startIndex, endIndex + 1);

        const result = JSON.parse(json) as T;

        return result;
    } 
    catch (e) {
        console.error(e);

        return undefined;
    }
}

export class AIProvider {
    static async generateTestWithAI(
        Theme: string,
        IsTimeLimited: boolean,
        PercentOfOpenTasks: number,
        TasksCount?: number | null,
        Difficulty?: number | null,
        Seconds?: number | null,
        Minutes?: number | null,
        FilePath?: string | null
    ): Promise<TestDto | undefined>
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
                `Задачи не обязательно должны иметь answers или rightAnswer, если это задачи открытого типа`;

            const response = await sendToAI(request, FilePath ?? undefined);
            const data: AIResponse = await response.json();
            const message = data.choices ? data.choices[0].message.content : "none";

            const test = tryGetTypeFromString(message, false) as TestDto;

            return test;
        }
        catch (error) {
            console.error(error);
        }
    }

    static async explainTasks(taskHistories: TaskHistoryDto[]): Promise<AIMessageForTask[] | undefined> {
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
}