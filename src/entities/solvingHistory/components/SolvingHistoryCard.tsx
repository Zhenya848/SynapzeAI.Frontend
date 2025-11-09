import { Box, Typography } from "@mui/material";
import { VerdictTaskCard } from "../../task/components/VerdictTaskCard";
import { SolvingHistory } from "../SolvingHistory";
import { GetNumberSecondsWordRus } from "../../../shared/helpers/GetNumberSecondsWordRus";
import { formatCustomDate } from "../../../shared/helpers/FormatCustomDate";

interface ISolvingHistoryTaskInfo {
    solvingHistory: SolvingHistory
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
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Пользователь: {solvingHistory.uniqueUserName}, telegram: {solvingHistory.userTelegram}
            </Typography>

            <Typography variant="h5" style={{marginTop: "20px"}}>
                Последнее время решения: {formatCustomDate(solvingHistory.solvingDate)}
            </Typography>

            <Typography variant="h5" style={{marginTop: "20px"}}>
                Продолжительность: {solvingHistory.solvingTimeSeconds} {GetNumberSecondsWordRus(solvingHistory.solvingTimeSeconds)}
            </Typography>

            <Box sx={{ 
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 600px), 1fr))",
                gap: 2,
                width: "100%",
                padding: 2,
                boxSizing: "border-box" 
            }}>
                {solvingHistory.taskHistories.map((taskHistory) => (
                    <VerdictTaskCard
                        nameCardInfo={taskHistory.taskName}
                        message={taskHistory.taskMessage}
                        userAnswer={taskHistory.userAnswer}
                        rightAnswer={taskHistory.rightAnswer}
                        answers={taskHistory.answers}
                        comment={taskHistory.message}
                        points={taskHistory.points}>
                    </VerdictTaskCard>
                ))}
            </Box>
        </Box>
    )
}