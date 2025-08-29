export type AIResponse = {
    choices?: {
        message: {
            content: string;
        };
    }[];
    error?: {
        message: string;
    };
}