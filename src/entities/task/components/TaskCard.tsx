import { Box, Button, Card, CardMedia } from "@mui/material";
import { CardInfo } from "../../../widgets/CardInfo";
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';

interface ITaskCardInfo {
    taskId: string;

    nameCardInfo: string,
    message: string,
    rightAnswer?: string,

    answers?: string[]

    onDelete?: any,
    onUpdate?: any
}

export function TaskCard({taskId, nameCardInfo, message, rightAnswer, answers, onDelete, onUpdate}: ITaskCardInfo) {
    return (
        <Box sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: "#616161",
            margin: '20px',
            minWidth: "280px",
            maxWidth: '520px',
            boxSizing: 'border-box'
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '15px', height: "90%" }}>
                <CardInfo title="Название" value={nameCardInfo} />
            
                <CardInfo title="Сообщение" value={message} />

                {answers && answers.length > 0 && <CardInfo title="Варианты ответов" value={answers.join(", ")} />}
                
                {rightAnswer && <CardInfo title="Правильный ответ" value={rightAnswer} />}

                <Button variant="outlined" sx={{ width: "100%", marginTop: "auto" }} onClick={() => onUpdate(taskId)} startIcon={<BuildIcon />}>Редактировать</Button>
                <Button variant="contained" sx={{ width: "100%" }} onClick={() => onDelete(taskId)} color="error" startIcon={<DeleteIcon />}>Удалить</Button>
            </Box>
        </Box>
    )
}