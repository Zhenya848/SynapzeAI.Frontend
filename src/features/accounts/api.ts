import { LoginResponse } from "../../entities/accounts/api/LoginResponse";
import { baseApi, USER_SERVICE_API_URL } from "../../shared/api";
import { Envelope } from "../api/model/Envelope";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<Envelope<void>, { userName: string, telegram: string, password: string }>({
            query: ({ userName, telegram, password }) => ({
                url: USER_SERVICE_API_URL + "registration",
                body: { userName, telegram, password },
                method: "POST"
            })
        }),

        login: builder.mutation<Envelope<LoginResponse>, { telegram: string, password: string }>({
            query: ({ telegram, password }) => ({
                url: USER_SERVICE_API_URL + "login",
                body: { telegram, password },
                method: "POST"
            }),
            invalidatesTags: ["Tests"]
        }),

        refresh: builder.mutation<Envelope<LoginResponse>, void>({
            query: () => ({
                url: USER_SERVICE_API_URL + "refresh",
                method: "POST"
            })
        }),

        logout: builder.mutation<Envelope<LoginResponse>, void>({
            query: () => ({
                url: USER_SERVICE_API_URL + "logout",
                method: "POST"
            })
        }),

        updateUser: builder.mutation<Envelope<string>, { userId: string, userName: string }>({
            query: ({ userId, userName }) => ({
                url: USER_SERVICE_API_URL + "users/" + userId,
                body: { userName },
                method: "PUT"
            })
        }),

        verifyUser: builder.mutation<void, { telegram: string, code: string }>({
            query: ({ telegram, code }) => ({
                url: USER_SERVICE_API_URL + "users/verify",
                body: { telegram, code },
                method: "POST"
            })
        })
    })
});

export const { 
    useRegisterMutation,
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
    useUpdateUserMutation,
    useVerifyUserMutation
 } = authApi;