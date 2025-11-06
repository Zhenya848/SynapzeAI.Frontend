import { Box, Button, Typography } from "@mui/material";
import { VerdictTaskCard } from "../../task/components/VerdictTaskCard";
import { SolvingHistory } from "../SolvingHistory";
import { GetNumberSecondsWordRus } from "../../../shared/helpers/GetNumberSecondsWordRus";
import { formatCustomDate } from "../../../shared/helpers/FormatCustomDate";
import { toast } from "react-toastify";

interface ISolvingHistoryTaskInfo {
    solvingHistory: SolvingHistory
}

export function SolvingHistoryCard({ solvingHistory }: ISolvingHistoryTaskInfo) {
    const handleUpdate = () => {
        toast.warn("Пока данный функционал в разработке");
    }

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
            <div style={{
                width: "100%", 
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: 10
            }}>
                <div></div>
                
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Пользователь: {solvingHistory.uniqueUserName}, telegram: {solvingHistory.userTelegram}
                </Typography>
                
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" sx={{justifyContent: "flex-end"}} onClick={handleUpdate}>
                        Редактировать
                    </Button>
                </div>
            </div>

            <Typography variant="h5" style={{marginTop: "20px"}}>Последнее время решения: {formatCustomDate(solvingHistory.solvingDate)}</Typography>
            <Typography variant="h5" style={{marginTop: "20px"}}>Продолжительность: {solvingHistory.solvingTimeSeconds} {GetNumberSecondsWordRus(solvingHistory.solvingTimeSeconds)}</Typography>

            <Box sx={{ display: 'flex', gap: 2, marginTop: "20px", width: '100%', overflowX: "auto", }}>
                {solvingHistory.taskHistories.map((taskHistory) => (
                    <VerdictTaskCard
                        nameCardInfo={taskHistory.taskName}
                        message={taskHistory.taskMessage}
                        userAnswer={taskHistory.userAnswer ?? "none"}
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