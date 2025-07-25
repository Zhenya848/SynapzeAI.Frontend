import { Box, Button, Card, CardMedia } from "@mui/material";
import { CardInfo } from "../CardInfo";
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';

interface ITaskCardInfo {
    taskId: string;

    imageUrl: string;
    audioUrl: string;

    nameCardInfo: string,
    message: string,
    rightAnswer?: string,

    answers?: string[]

    onDelete?: any,
    onUpdate?: any
}

export function TaskCard({taskId, imageUrl, nameCardInfo, message, rightAnswer, answers, onDelete, onUpdate}: ITaskCardInfo) {
    return (
        <Box sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: "#616161",
            margin: '20px',
            maxWidth: '520px',
            boxSizing: 'border-box'
        }}>
            <Card sx={{ 
                maxWidth: 480,
                margin: '10px auto'
            }}>
                <CardMedia component="img" height="140" image={imageUrl} alt="image" />
            </Card>

            <div style={{margin: '15px'}}><CardInfo title="Название" value={nameCardInfo} /></div>
            
            <div style={{margin: '15px'}}><CardInfo title="Сообщение" value={message} /></div>

            {answers && <div style={{margin: '15px'}}><CardInfo title="Варианты ответов" value={answers.join(", ")} /></div>}
            
            {rightAnswer && <div style={{margin: '15px'}}><CardInfo title="Правильный ответ" value={rightAnswer} /></div>}

            <Button variant="outlined" sx={{ width: "100%" }} onClick={() => onUpdate(taskId)} startIcon={<BuildIcon />}>Редактировать</Button>
            <Button variant="contained" sx={{ width: "100%", marginTop: "10px" }} onClick={() => onDelete(taskId)} color="error" startIcon={<DeleteIcon />}>Удалить</Button>
        </Box>
    )
}