import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getErrorMessages } from "../utils/getErrorMessages";
import { toast } from "react-toastify";

export function HandleError(error: unknown) {
    const rtkError = error as FetchBaseQueryError | SerializedError | undefined;
    console.error(rtkError);

    getErrorMessages(rtkError).map(error => {
        toast.error(error);
    });
}