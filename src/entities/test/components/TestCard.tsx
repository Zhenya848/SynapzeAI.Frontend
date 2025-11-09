import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import LinkIcon from '@mui/icons-material/Link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import { Test } from "../Test";
import { CardInfo } from "../../../widgets/CardInfo";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

interface ITestCardInfo {
    test: Test;
    onDelete?: (testId: string) => void;
    onUpdate?: (test: Test) => void;
    onStartDecide?: (testId: string) => void;
    onShowSolvingHistories?: (testId: string) => void;
    onCopyLink?: (testId: string) => void;
    onSavingTest?: (testId: string) => void;
}

export function TestCard({test, onDelete, onUpdate, onStartDecide, onShowSolvingHistories, onCopyLink, onSavingTest}: ITestCardInfo) {
    const handleStartDecide = () => {
        onStartDecide?.(test.id);
    };

    const handleUpdate = () => {
        onUpdate?.(test);
    };

    const handleShowSolvingHistories = () => {
        onShowSolvingHistories?.(test.id);
    };

    const handleDelete = () => {
        onDelete?.(test.id);
    };

    const handleCopyLink = () => {
        onCopyLink?.(test.id);
    };

    const handleSavingTest = () => {
        onSavingTest?.(test.id);
    };

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
                position: 'relative',
                '@media (max-width: 900px)': {
                    flexDirection: "column"
                },
        }}>
            <Box sx={{
                display: 'flex', 
                width: "100%", 
                margin: "10px", 
                marginLeft: "30px",
                '@media (max-width: 900px)': {
                    marginLeft: "10px"
                }
            }}>
                <div style={{width: "100%", boxSizing: 'border-box'}}>
                    <CardInfo title="Название" value={test.testName} />
                    <div style={{marginTop: "20px"}}><CardInfo title="Тема" value={test.theme} /></div>
                </div>

                <div style={{boxSizing: 'border-box', width: "100%"}}>
                    <CardInfo 
                        title="Огранич. по времени" 
                        value={(test.limitTime 
                            ? `Секунд: ${test.limitTime?.seconds},${'\u00A0'.repeat(2)}Минут: ${test.limitTime?.minutes}` 
                            : "нет")} 
                    />

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
                    <p style={{textAlign: 'center'}}>
                        <Button 
                            variant="contained" 
                            color="success" 
                            onClick={handleStartDecide} 
                            sx={{ color: 'white'}} 
                            startIcon={<PlayArrowIcon />}>
                                Решать
                        </Button>
                    </p>

                    <p style={{marginTop: "20px", textAlign: 'center'}}>
                        <Button 
                            onClick={handleUpdate} 
                            variant="outlined" 
                            startIcon={<BuildIcon />}>
                                Редакт.
                        </Button>
                    </p>
                </div>

                <div style={{maxWidth:"250px", width: "100%", boxSizing: 'border-box'}}>
                    <p style={{textAlign: 'center'}}>
                        <Button 
                            onClick={handleShowSolvingHistories} 
                            variant="contained" 
                            color="warning" 
                            sx={{ color: 'white'}}
                            startIcon={<HistoryIcon />}>
                                История
                        </Button>
                    </p>

                    <p style={{marginTop: "20px", textAlign: 'center'}}>
                        <Button onClick={handleDelete} 
                            variant="contained" 
                            color="error" 
                            startIcon={<DeleteIcon />}>
                                Удалить
                        </Button>
                    </p>
                </div>

                <div style={{boxSizing: 'border-box', display: "flex", flexDirection: "column", gap: 20}}>
                    {
                    test.tasks.length > 0
                    && 
                    <Button 
                        onClick={handleCopyLink} 
                        color="inherit"
                    >
                        <LinkIcon style={{ fontSize: 25 }} />
                    </Button>
                    }

                    <Button 
                        onClick={handleSavingTest} 
                        color="inherit"
                    >
                        {test.isSaved ? <BookmarkAddedIcon style={{ fontSize: 25 }} /> : <BookmarkBorderIcon style={{ fontSize: 25 }} />}
                    </Button>
                </div>
            </Box>
        </Box>
    )
}