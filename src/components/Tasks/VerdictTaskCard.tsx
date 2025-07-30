import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { CardInfo } from "../CardInfo";
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';

interface IVerdictTaskCardInfo {
    imageUrl?: string;
    audioUrl?: string;

    nameCardInfo: string;
    message: string;

    userAnswer: string
    rightAnswer?: string;

    answers?: string[]

    comment?: string
}

function getBgColor(isRightAnswer: boolean | string | undefined) {
    return isRightAnswer != undefined ? (isRightAnswer ? "#17a023" : "#8b171c") : "#616161"
}

export function VerdictTaskCard({imageUrl, nameCardInfo, message, userAnswer, rightAnswer, answers, comment}: IVerdictTaskCardInfo) {
    const isRightAnswer = rightAnswer && userAnswer.toLocaleLowerCase() === rightAnswer.toLowerCase()

    return (
        <Box sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: getBgColor(isRightAnswer),
            margin: '20px',
            maxWidth: '520px',
            boxSizing: 'border-box'
        }}>
            {rightAnswer && <Typography sx={{textAlign: 'center'}}>{userAnswer.toLocaleLowerCase() === rightAnswer.toLowerCase() ? "Верно!" : "Неверно!"}</Typography>}

            <Card sx={{ 
                maxWidth: 480,
                margin: '10px auto'
            }}>
                <CardMedia component="img" height="140" image={imageUrl} alt="Без фото" />
            </Card>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', margin: "15px", gap: 2 }}>
                    <CardInfo title="Название" value={nameCardInfo} />
                
                    <CardInfo title="Сообщение" value={message} />

                    {answers && answers.length > 0 && <CardInfo title="Варианты ответов" value={answers.join(", ")} />}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', margin: "15px", gap: 2 }}>
                    {rightAnswer && <CardInfo title="Правильный ответ" value={rightAnswer} />}

                    <CardInfo title="Ваш ответ" value={userAnswer} />

                    {comment && <CardInfo title="Комментарий к задаче" value={comment} />}
                </Box>
            </Box>
        </Box>
    )
}