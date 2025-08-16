import { Box, Button, Card, CardMedia } from "@mui/material";
import { CardInfo } from "../CardInfo";
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import { TestDto } from "../../models/Api/Tests/TestDto";

interface ITestCardInfo {
    test: TestDto,
    onDelete?: any,
    onUpdate?: any,
    onStartDecide?: any,
    onShowSolvingHistories?: any
}

export function TestCard({test, onDelete, onUpdate, onStartDecide, onShowSolvingHistories}: ITestCardInfo) {
    return (
        <Box 
            component="section" 
            sx={{ 
                p: 1, 
                borderRadius: 3, 
                bgcolor: "#616161", 
                marginTop: '20px', 
                alignItems: "center", 
                display: 'flex', 
                width: "calc(100% - 10px)", 
                margin: "5px",
                '@media (max-width: 900px)': {
                    flexDirection: "column"
                },
        }}>
            <Box sx={{display: 'flex', width: "100%", margin: "10px", marginLeft: "30px"}}>
                <div style={{width: "100%", boxSizing: 'border-box'}}>
                    <CardInfo title="Название" value={test.testName} />
                    <div style={{marginTop: "20px"}}><CardInfo title="Тема" value={test.theme} /></div>
                </div>

                <div style={{boxSizing: 'border-box', width: "100%"}}>
                    <CardInfo title="Огранич. по времени" value={(test.limitTime ? `Секунд: ${test.limitTime?.seconds},${'\u00A0'.repeat(2)}Минут: ${test.limitTime?.minutes}` : "нет")} />
                    <div style={{marginTop: "20px"}}><CardInfo title="Опубликовано" value={(test.isPublished ? "Да" : "Нет")} /></div>
                </div>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: 'flex-end',
                    width: "100%",
                    '@media (max-width: 900px)': {
                        justifyContent: 'center',
                        marginTop: "20px"
                    },
                }}
                >
                <div style={{maxWidth:"250px", width: "100%", boxSizing: 'border-box'}}>
                    <p style={{textAlign: 'center'}}><Button variant="contained" color="success" onClick={() => onStartDecide(test.id)} sx={{ color: 'white'}} startIcon={<PlayArrowIcon />}>Начать решать</Button></p>
                    <p style={{marginTop: "20px", textAlign: 'center'}}><Button onClick={() => onUpdate(test)} variant="outlined" startIcon={<BuildIcon />}>Редактировать</Button></p>
                </div>

                <div style={{maxWidth:"250px", width: "100%", boxSizing: 'border-box'}}>
                    <p style={{textAlign: 'center'}}><Button onClick={() => onShowSolvingHistories(test.id)} variant="contained" color="warning" sx={{ color: 'white'}} startIcon={<HistoryIcon />}>История</Button></p>
                    <p style={{marginTop: "20px", textAlign: 'center'}}><Button onClick={() => onDelete(test.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>Удалить</Button></p>
                </div>
            </Box>
        </Box>
    )
}