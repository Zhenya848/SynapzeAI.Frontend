export type TaskHistoryDto = {
    serialNumber: number
    taskName: string
    taskMessage: string
    rightAnswer?: string
    
    answers?: string[]
    userAnswer: string

    messageAI?: string
}