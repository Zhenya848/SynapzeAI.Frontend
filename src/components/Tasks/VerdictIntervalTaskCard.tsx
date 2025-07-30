import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { CardInfo } from "../CardInfo";
import { TaskStatisticDto } from "../../models/Dtos/Tasks/TaskStatisticDto";
import { textStyle } from "../../models/FilledBoxStyles/TextStyle";
import { fillStyle } from "../../models/FilledBoxStyles/FillStyle";

interface IVerdictTaskCardInfo {
    imageUrl?: string;
    audioUrl?: string;

    nameCardInfo: string;
    message: string;

    taskStatistic: TaskStatisticDto;

    progressValue: number;

    rightAnswer?: string;

    answers?: string[]
}

export function VerdictIntervalTaskCard({imageUrl, nameCardInfo, message, taskStatistic, progressValue: progressValue, rightAnswer, answers}: IVerdictTaskCardInfo) {
    return (
        <Box sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: "#636363",
            margin: '20px',
            maxWidth: '520px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Card sx={{ 
                maxWidth: 480,
                margin: '10px auto'
            }}>
                <CardMedia component="img" height="140" image={imageUrl} alt="image" />
            </Card>

            

            <Box sx={{ ...textStyle, display: 'flex', flexDirection: 'column', gap: '15px', margin: '15px' }}>
                <CardInfo title="Название" value={nameCardInfo} />
            
                <CardInfo title="Сообщение" value={message} />

                {answers && answers.length > 0 && <CardInfo title="Варианты ответов" value={answers.join(", ")} />}
                
                {rightAnswer && <CardInfo title="Правильный ответ" value={rightAnswer} />}

                <CardInfo title="Последнее время решения" value={taskStatistic.lastReviewTime.toTimeString()} />
                <CardInfo title="Верных ответов: " value={taskStatistic.rightAnswersCount.toString()} />
                <CardInfo title="Неверных ответов: " value={taskStatistic.errorsCount.toString()} />
                <CardInfo title="Среднее время решения" value={taskStatistic.avgTimeSolvingSec.toString()}/>
            </Box>

            <div style={fillStyle(progressValue)} />
        </Box>
    )
}