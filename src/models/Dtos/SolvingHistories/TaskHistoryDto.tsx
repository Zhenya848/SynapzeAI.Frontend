export type TaskHistoryDto = {
    taskName: string
    taskMessage: string
    rightAnswer?: string
    
    imagePath?: string
    audioPath?: string
    
    answers?: string[]
    userAnswer: string

    messageAI?: string
}