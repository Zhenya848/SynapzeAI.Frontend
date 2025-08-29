import { AIMessageForTask } from "../../entities/solvingHistory/api/AIMessageForTask";
import { SolvingHistory } from "../../entities/solvingHistory/SolvingHistory";
import { TaskHistory } from "../../entities/taskHistory/TaskHistory";
import { baseApi, TESTS_SERVICE_API_URL } from "../../shared/api";
import { Envelope } from "../api/model/Envelope";
import { PageList } from "../api/model/PageList";

export const solvingHistoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSolvingHistory: builder.mutation<Envelope<string>, { testId: string, taskHistories: TaskHistory[], solvingDate: Date, solvingTimeSeconds: number }>({
            query: ({ testId, taskHistories, solvingDate, solvingTimeSeconds }) => ({
                url: TESTS_SERVICE_API_URL + `${testId}/history`,
                body: { taskHistories, solvingDate, solvingTimeSeconds },
                method: "PUT"
            }),
            invalidatesTags: ["Tests"]
        }),

        getSolvingHistoriesWithPagination: builder.query<Envelope<PageList<SolvingHistory>>, { page: number, pageSize: number, testId: string, searchUserName?: string, searchUserEmail?: string, orderBy?: string }>({
            query: ({ page, pageSize, testId, searchUserName, searchUserEmail, orderBy }) => ({
                url: TESTS_SERVICE_API_URL + `${testId}/history`,
                body: { page, pageSize, searchUserName, searchUserEmail, orderBy },
                method: "POST"
            })
        }),

        updateAIMessagesForTasks: builder.mutation<void, { solvingHistoryId: string, aiMessagesForTasks: AIMessageForTask[] }>({
            query: ({ solvingHistoryId, aiMessagesForTasks }) => ({
                url: TESTS_SERVICE_API_URL + `history/update/${solvingHistoryId}`,
                body: { aiMessagesForTasks },
                method: "PUT"
            }),
            invalidatesTags: ["Tests"]
        })
    })
});

export const { 
    useCreateSolvingHistoryMutation,
    useGetSolvingHistoriesWithPaginationQuery,
    useUpdateAIMessagesForTasksMutation 
} = solvingHistoriesApi;