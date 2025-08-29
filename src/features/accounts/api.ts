import { LoginResponse } from "../../entities/accounts/api/LoginResponse";
import { baseApi, USER_SERVICE_API_URL } from "../../shared/api";
import { Envelope } from "../api/model/Envelope";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<void, { userName: string, email: string, password: string }>({
            query: ({ userName, email, password }) => ({
                url: USER_SERVICE_API_URL + "registration",
                body: { userName, email, password },
                method: "POST"
            })
        }),

        login: builder.mutation<Envelope<LoginResponse>, { email: string, password: string }>({
            query: ({ email, password }) => ({
                url: USER_SERVICE_API_URL + "login",
                body: { email, password },
                method: "POST"
            })
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
        })
    })
});

export const { 
    useRegisterMutation,
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation,
    useUpdateUserMutation } = authApi;