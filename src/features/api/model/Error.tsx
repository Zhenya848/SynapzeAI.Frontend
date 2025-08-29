import { ErrorType } from "./ErrorType";

export type Error = {
    code: string;
    message: string;
    errorType: ErrorType;
    invalidField: string | null;
}