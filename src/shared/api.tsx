import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AppState } from "../app/store";
import { Envelope } from "../features/api/model/Envelope";
import { LoginResponse } from "../entities/accounts/api/LoginResponse";
import { setCredentials } from "../features/accounts/auth.slice";

export const TESTS_SERVICE_API_URL = "http://localhost:5144/api/Test/"
export const USER_SERVICE_API_URL = "http://localhost:5276/api/Account/";
export const PAYMENT_SERVICE_API_URL = "/api/Payments/";

const baseQuery = fetchBaseQuery({
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as AppState).auth.accessToken;

        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`);
        }

        return headers;
    }
});

const baseQueryWithRefresh: typeof baseQuery = async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions);

    if (response.error && response.error.status === 401) {
        const authResponse = await baseQuery(
            {
                url: USER_SERVICE_API_URL + "refresh",
                method: "POST"
            },
            api,
            extraOptions
        );

        if (authResponse.error) {
            window.location.href = '/login';

            return response;
        }

        const data = authResponse.data as Envelope<LoginResponse>;

        api.dispatch(setCredentials({ accessToken: data.result!.accessToken, user: data.result!.user }))

        response = await baseQuery(args, api, extraOptions);
    }

    return response;
}

export const baseApi = createApi({
    baseQuery: baseQueryWithRefresh,
    endpoints: () => ({}),
    tagTypes: ["Tests"]
})