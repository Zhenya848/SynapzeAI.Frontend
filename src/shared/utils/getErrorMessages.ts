import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Envelope } from "../../features/api/model/Envelope";
import { ErrorMessages } from "./errorMessages";

export const getErrorMessages = (error: FetchBaseQueryError | SerializedError | undefined): string[] => {
    if (error) {
        if ("status" in error) {
            const errorData = error.data as Envelope<null> | undefined;

            if (errorData && errorData.responseErrors) {
                return errorData.responseErrors.map(error => {
                    return ErrorMessages[error.code] || error.message || "Неизвестная ошибка";
                });
            }

            return ["Серверная ошибка"];
        }

        return ["Непредвиденная ошибка"];
    }

    return [];
}