import { Box, Typography } from "@mui/material";
import { VerdictTaskCard } from "../../task/components/VerdictTaskCard";
import { SolvingHistory } from "../SolvingHistory";

interface ISolvingHistoryTaskInfo {
    solvingHistory: SolvingHistory
}

export function SolvingHistoryCard({ solvingHistory }: ISolvingHistoryTaskInfo) {
    function formatCustomDate(dateInput: Date | string) {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

        const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const months = [
            'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
            'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const weekDay = days[date.getDay()];
        
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day} ${month} ${year}, ${weekDay}, ${hours}:${minutes}`;
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
            <Typography variant="h5">Пользователь: {solvingHistory.uniqueUserName}, почта: {solvingHistory.userEmail}</Typography>
            <Typography variant="h5" style={{marginTop: "20px"}}>Последнее время решения: {formatCustomDate(solvingHistory.solvingDate)}</Typography>
            <Typography variant="h5" style={{marginTop: "20px"}}>Продолжительность: {solvingHistory.solvingTimeSeconds} секунд</Typography>

            <Box sx={{ display: 'flex', gap: 2, marginTop: "20px", width: '100%', overflowX: "auto", }}>
                {solvingHistory.taskHistories.map((taskHistory) => (
                    <VerdictTaskCard
                        nameCardInfo={taskHistory.taskName}
                        message={taskHistory.taskMessage}
                        userAnswer={taskHistory.userAnswer ?? "none"}
                        rightAnswer={taskHistory.rightAnswer}
                        answers={taskHistory.answers}
                        comment={taskHistory.messageAI}>
                    </VerdictTaskCard>
                ))}
            </Box>
        </Box>
    )
}