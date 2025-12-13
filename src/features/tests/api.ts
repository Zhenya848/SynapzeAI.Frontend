import { UpdateTaskHistoryDto } from "../../entities/solvingHistory/api/UpdateTaskHistoryDto";
import { CreateTaskDto } from "../../entities/task/api/CreateTaskDto";
import { UpdateTaskDto } from "../../entities/task/api/UpdateTaskDto";
import { UpdateTaskStatisticDto } from "../../entities/taskStatistic/api/UpdateTaskStatisticDto";
import { Test } from "../../entities/test/Test";
import { baseApi, TESTS_SERVICE_API_URL } from "../../shared/api";
import { Envelope } from "../api/model/Envelope";
import { PageList } from "../api/model/PageList";

export const testsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTests: builder.query<Envelope<Test[]>, void>({
            query: () => ({
                url: TESTS_SERVICE_API_URL + "tests",
                method: "GET"
            }),
            providesTags: ["Tests"]
        }),

        getTest: builder.mutation<Envelope<Test>, { testId: string }>({
            query: ({ testId }) => ({
                url: TESTS_SERVICE_API_URL + testId + "/test",
                method: "GET"
            })
        }),

        getWithPagination: builder.query<Envelope<PageList<Test>>, { page: number, pageSize: number, searchTestName?: string, searchTestTheme?: string, searchUserName?: string, orderBy?: string }>({
            query: ({ page, pageSize, searchTestName, searchTestTheme, searchUserName, orderBy }) => ({
                url: TESTS_SERVICE_API_URL + "tests",
                body: { page, pageSize, searchTestName, searchTestTheme, searchUserName, orderBy },
                method: "POST"
            }),
            providesTags: ["Tests"]
        }),

        deleteTest: builder.mutation<Envelope<string>, { testId: string }>({
            query: ({ testId }) => ({
                url: TESTS_SERVICE_API_URL + testId,
                body: { testId },
                method: "DELETE"
            }),
            invalidatesTags: ["Tests"]
        }),

        updateTest: builder.mutation<Envelope<string>, { testId: string, testName: string, theme: string, isPublished: boolean, seconds?: number, minutes?:number, tasksToCreate?: CreateTaskDto[], tasksToUpdate?: UpdateTaskDto[], taskIdsToDelete?: string[] }>({
            query: ({ testId, testName, theme, isPublished, seconds, minutes, tasksToCreate, tasksToUpdate, taskIdsToDelete }) => ({
                url: TESTS_SERVICE_API_URL + testId,
                body: { testName, theme, isPublished, seconds, minutes, tasksToCreate, tasksToUpdate, taskIdsToDelete },
                method: "PUT"
            }),
            invalidatesTags: ["Tests"]
        }),

        createTest: builder.mutation<Envelope<string>, { testName: string, theme: string, isPublished: boolean, tasks?: CreateTaskDto[], seconds?: number, minutes?: number }>({
            query: ({ testName, theme, isPublished, seconds, minutes, tasks }) => ({
                url: TESTS_SERVICE_API_URL,
                body: { testName, theme, isPublished, seconds, minutes, tasks },
                method: "POST"
            }),
            invalidatesTags: ["Tests"]
        }),

        createTestWithAi: builder.mutation<string, {testTheme: string, percentOfOpenTasks: number, difficulty: number, tasksCount?: number, seconds?: number, minutes?: number, file?: File}>({
            query: ({ testTheme, percentOfOpenTasks, difficulty, tasksCount, seconds, minutes, file }) => {
                const formData = new FormData();

                formData.append('TestTheme', testTheme);
                formData.append('PercentOfOpenTasks', percentOfOpenTasks.toString());
                formData.append('Difficulty', difficulty.toString());
                
                if (tasksCount !== undefined && tasksCount !== null) {
                    formData.append('TasksCount', tasksCount.toString());
                }
                
                if (seconds !== undefined && seconds !== null) {
                    formData.append('Seconds', seconds.toString());
                }
                
                if (minutes !== undefined && minutes !== null) {
                    formData.append('Minutes', minutes.toString());
                }
                
                if (file) {
                    formData.append('File', file);
                }

                return {
                    url: TESTS_SERVICE_API_URL + "withAi",
                    method: 'POST',
                    body: formData,
                };
            }
        }),

        explainTasks: builder.mutation<Envelope<UpdateTaskHistoryDto[]>, { solvingHistoryId: string }>({
            query: ({ solvingHistoryId }) => ({
                url: TESTS_SERVICE_API_URL + `${solvingHistoryId}/explain`,
                method: "PUT"
            }),
            invalidatesTags: ["Tests"]
        }),

        updateTasksStatistics: builder.mutation<void, { tasks: UpdateTaskStatisticDto[] }>({
            query: ({ tasks }) => ({
                url: TESTS_SERVICE_API_URL + "tasksStatistic",
                body: { tasks },
                method: "PUT"
            }),
            invalidatesTags: ["Tests"]
        }),

        addSavedTest: builder.mutation<string, { testId: string }>({
            query: ({ testId }) => ({
                url: TESTS_SERVICE_API_URL + testId + "/saved",
                method: "POST"
            }),
            invalidatesTags: ["Tests"]
        }),

        getSavedTestsWithPagination: builder.query<Envelope<PageList<Test>>, { page: number, pageSize: number, searchTestName?: string, searchTestTheme?: string, searchUserName?: string, orderBy?: string }>({
            query: ({ page, pageSize, searchTestName, searchTestTheme, searchUserName, orderBy }) => ({
                url: TESTS_SERVICE_API_URL + "tests/saved",
                body: { page, pageSize, searchTestName, searchTestTheme, searchUserName, orderBy },
                method: "POST"
            }),
            providesTags: ["Tests"]
        }),

        deleteSavedTest: builder.mutation<Envelope<string>, { testId: string }>({
            query: ({ testId }) => ({
                url: TESTS_SERVICE_API_URL + testId + "/saved",
                body: { testId },
                method: "DELETE"
            }),
            invalidatesTags: ["Tests"]
        })
    })
});

export const { 
    useGetTestsQuery, 
    useGetTestMutation, 
    useGetWithPaginationQuery, 
    useDeleteTestMutation, 
    useUpdateTestMutation,
    useCreateTestMutation,
    useCreateTestWithAiMutation,
    useExplainTasksMutation,
    useUpdateTasksStatisticsMutation,
    useAddSavedTestMutation,
    useGetSavedTestsWithPaginationQuery,
    useDeleteSavedTestMutation
} = testsApi;