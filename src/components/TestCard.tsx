import { Box, Button, Card, CardMedia } from "@mui/material";
import { CardInfo } from "./CardInfo";
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import { TestDto } from "../models/Dtos/TestDto";

interface ITestCardInfo {
    test: TestDto,
    onDelete,
    onUpdate
}

export function TestCard({test, onDelete, onUpdate}: ITestCardInfo) {
    return (
        <Box component="section" sx={{ p: 1, borderRadius: 3, bgcolor: "#616161", marginTop: '20px', alignItems: "center", display: 'flex', width: "100%"}}>
            <Card sx={{ maxWidth: 200, margin: '10px' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image=""
                    alt="image"
                />
            </Card>

            <div style={{marginLeft: "30px", margin: "10px", width: "100%", boxSizing: 'border-box'}}>
                <CardInfo title="Название" value={test.testName} />
                <div style={{marginTop: "20px"}}><CardInfo title="Тема" value={test.theme} /></div>
            </div>

            <div style={{width: "100%", boxSizing: 'border-box'}}>
                <CardInfo title="Ограничения по времени" value={(test.limitTime ? `Секунд: ${test.limitTime?.seconds}${'\u00A0'.repeat(4)}Минут: ${test.limitTime?.minutes}` : "нет")} />
                <div style={{marginTop: "20px"}}><CardInfo title="Опубликовано" value={(test.isPublished ? "Да" : "Нет")} /></div>
            </div>

            <div style={{marginLeft: "120px", width: "100%", boxSizing: 'border-box'}}>
                <p><Button variant="contained" color="success" sx={{ color: 'white'}} startIcon={<PlayArrowIcon />}>Начать решать</Button></p>
                <p style={{marginTop: "20px"}}><Button onClick={() => onUpdate(test)} variant="outlined" startIcon={<BuildIcon />}>Редактировать</Button></p>
            </div>

            <div style={{width: "100%", boxSizing: 'border-box'}}>
                <p><Button variant="contained" color="warning" sx={{ color: 'white'}} startIcon={<HistoryIcon />}>История решений</Button></p>
                <p style={{marginTop: "20px"}}><Button onClick={() => onDelete(test.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>Удалить</Button></p>
            </div>
        </Box>
    )
}