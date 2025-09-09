import { baseApi, PAYMENT_SERVICE_API_URL } from "../../shared/api";
import { Envelope } from "../api/model/Envelope";

export const testsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<Envelope<string>, { productId: string }>({
            query: ({ productId }) => ({
                url: PAYMENT_SERVICE_API_URL + "create",
                body: { productId },
                method: "POST"
            })
        }),
    })
});

export const { 
    useCreatePaymentMutation
} = testsApi;