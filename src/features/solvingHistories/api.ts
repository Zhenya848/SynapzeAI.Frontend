import { UpdateTaskHistoryDto } from "../../entities/solvingHistory/api/UpdateTaskHistoryDto";
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

        getSolvingHistoriesWithPagination: builder.query<Envelope<PageList<SolvingHistory>>, { page: number, pageSize: number, testId: string, searchUserName?: string, searchUserTelegram?: string, orderBy?: string }>({
            query: ({ page, pageSize, testId, searchUserName, searchUserTelegram, orderBy }) => ({
                url: TESTS_SERVICE_API_URL + `${testId}/history`,
                body: { page, pageSize, searchUserName, searchUserTelegram, orderBy },
                method: "POST"
            })
        }),

        updateSolvingHistory: builder.mutation<void, { solvingHistoryId: string, tasks: UpdateTaskHistoryDto[] }>({
            query: ({ solvingHistoryId, tasks }) => ({
                url: TESTS_SERVICE_API_URL + `history/update/${solvingHistoryId}`,
                body: { tasks },
                method: "PUT"
            }),
            invalidatesTags: ["Tests"]
        })
    })
});

export const { 
    useCreateSolvingHistoryMutation,
    useGetSolvingHistoriesWithPaginationQuery,
    useUpdateSolvingHistoryMutation 
} = solvingHistoriesApi;