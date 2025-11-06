import { Box, Typography } from "@mui/material";
import { CardInfo } from "../../../widgets/CardInfo";

interface IVerdictTaskCardInfo {
    nameCardInfo: string;
    message: string;

    userAnswer: string
    rightAnswer?: string;

    answers?: string[]

    comment?: string
    points?: number
}

function getBgColor(isRightAnswer: boolean | string | undefined) {
    return isRightAnswer != undefined ? (isRightAnswer ? "#17a023" : "#8b171c") : "#616161"
}

export function VerdictTaskCard({nameCardInfo, message, userAnswer, rightAnswer, answers, comment, points}: IVerdictTaskCardInfo) {
    const isRightAnswer = rightAnswer && userAnswer.toLocaleLowerCase() === rightAnswer.toLowerCase()

    return (
        <Box sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: getBgColor(isRightAnswer),
            margin: '20px',
            width: '520px',
            boxSizing: 'border-box'
        }}>
            {rightAnswer && <Typography sx={{textAlign: 'center'}}>{userAnswer.toLocaleLowerCase() === rightAnswer.toLowerCase() ? "Верно!" : "Неверно!"}</Typography>}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '20px' }}>
                <CardInfo title="Название" value={nameCardInfo} />
                
                <CardInfo title="Сообщение" value={message} />

                {answers && answers.length > 0 && <CardInfo title="Варианты ответов" value={answers.join(", ")} />}
                {rightAnswer && <CardInfo title="Правильный ответ" value={rightAnswer} />}

                <CardInfo title="Ответ пользователя" value={userAnswer} />

                {comment && <CardInfo title="Комментарий к задаче" value={comment} />}
                {points && <CardInfo title="Правильность ответа" value={points.toString() + " / 100"} />}
            </Box>
        </Box>
    )
}