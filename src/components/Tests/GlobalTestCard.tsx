import { Box, Button, Card, CardMedia } from "@mui/material";
import { CardInfo } from "../CardInfo";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { TestDto } from "../../models/Api/Tests/TestDto";

interface ITestCardInfo {
    test: TestDto,
    onStartDecide?: any,
}

export function GlobalTestCard({test: test, onStartDecide}: ITestCardInfo) {
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
                    <div style={{marginTop: "20px"}}><CardInfo title="Создатель: " value={test.uniqueUserName} /></div>
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

                <div style={{boxSizing: 'border-box', width: "100%"}}>
                    <p style={{textAlign: 'center'}}><Button variant="contained" color="success" onClick={() => onStartDecide(test.id)} sx={{ color: 'white'}} startIcon={<PlayArrowIcon />}>Начать решать</Button></p>
                </div>
            </Box>
        </Box>
    )
}