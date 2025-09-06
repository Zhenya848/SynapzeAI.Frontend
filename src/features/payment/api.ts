import { baseApi, TESTS_SERVICE_API_URL } from "../../shared/api";
import { Envelope } from "../api/model/Envelope";

export const testsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<Envelope<string>, { amount: number }>({
            query: ({ amount }) => ({
                url: TESTS_SERVICE_API_URL + "payment",
                body: { amount },
                method: "POST"
            })
        }),
    })
});

export const { 
    useCreatePaymentMutation
} = testsApi;