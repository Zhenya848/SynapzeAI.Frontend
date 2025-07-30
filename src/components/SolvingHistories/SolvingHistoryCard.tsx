import { Box, Typography } from "@mui/material";
import { SolvingHistoryDto } from "../../models/Dtos/SolvingHistories/SolvingHistoryDto";
import { VerdictTaskCard } from "../Tasks/VerdictTaskCard";

interface ISolvingHistoryTaskInfo {
    solvingHistory: SolvingHistoryDto
}

export function SolvingHistoryCard({ solvingHistory }: ISolvingHistoryTaskInfo) {
    return (
        <Box sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: "#616161",
            margin: '20px',
            width: 'calc(100% - 40px)',
            boxSizing: 'border-box',
            textAlign: 'center'
        }}>
            <Typography variant="h5">Последнее время решения: {solvingHistory.solvingDate.toString()}</Typography>
            <Typography variant="h5" style={{marginTop: "20px"}}>Продолжительность: {solvingHistory.solvingTimeSeconds} секунд</Typography>

            <Box sx={{ display: 'flex', gap: 2, marginTop: "20px", width: '100%', overflowX: "auto", }}>
                {solvingHistory.taskHistories.map((taskHistory) => (
                    <VerdictTaskCard
                        nameCardInfo={taskHistory.taskName}
                        message={taskHistory.taskMessage}
                        userAnswer={taskHistory.userAnswer ?? "none"}
                        rightAnswer={taskHistory.rightAnswer}
                        answers={taskHistory.answers}
                        comment={taskHistory.messageAI}
                        imageUrl={taskHistory.imagePath}
                        audioUrl={taskHistory.audioPath}>
                    </VerdictTaskCard>
                ))}
            </Box>
        </Box>
    )
}