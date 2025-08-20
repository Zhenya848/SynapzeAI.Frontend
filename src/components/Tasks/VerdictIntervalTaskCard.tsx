import { Box } from "@mui/material";
import { CardInfo } from "../CardInfo";
import { TaskStatisticDto } from "../../models/Api/Tasks/TaskStatisticDto";
import { textStyle } from "../../models/FilledBoxStyles/TextStyle";
import { fillStyle } from "../../models/FilledBoxStyles/FillStyle";

interface IVerdictTaskCardInfo {
    imageUrl?: string;
    audioUrl?: string;

    nameCardInfo: string;
    message: string;

    taskStatistic?: TaskStatisticDto;

    progressValue: number;

    rightAnswer?: string;

    answers?: string[]
}

export function VerdictIntervalTaskCard({nameCardInfo, message, taskStatistic, progressValue: progressValue, rightAnswer, answers}: IVerdictTaskCardInfo) {
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
            <Box sx={{ ...textStyle, display: 'flex', flexDirection: 'column', gap: '15px', margin: '15px' }}>
                <CardInfo title="Название" value={nameCardInfo} />
            
                <CardInfo title="Сообщение" value={message} />

                {answers && answers.length > 0 && <CardInfo title="Варианты ответов" value={answers.join(", ")} />}
                
                {rightAnswer && <CardInfo title="Правильный ответ" value={rightAnswer} />}

                <CardInfo title="Последнее время решения" value={taskStatistic?.lastReviewTime.toString() ?? 'none'} />
                <CardInfo title="Верных ответов: " value={taskStatistic?.rightAnswersCount.toString() ?? '0'} />
                <CardInfo title="Неверных ответов: " value={taskStatistic?.errorsCount.toString() ?? '0'} />
                <CardInfo title="Среднее время решения" value={taskStatistic?.avgTimeSolvingSec.toString() ?? '0'}/>
            </Box>

            <div style={fillStyle(progressValue)} />
        </Box>
    )
}