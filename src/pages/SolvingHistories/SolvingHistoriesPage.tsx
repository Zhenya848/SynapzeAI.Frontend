import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SolvingHistories } from "../../api/Endpoints/solvingHistories";
import { toast } from "react-toastify";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, InputAdornment, Table, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { SolvingHistoryCard } from "../../components/SolvingHistories/SolvingHistoryCard";
import { TestDto } from "../../models/Api/Tests/TestDto";
import { VerdictIntervalTaskCard } from "../../components/Tasks/VerdictIntervalTaskCard";
import { calculatePriorityNumber } from "../../models/Tasks/CalculatePriorityNumber";
import { SolvingHistoryDto } from "../../models/Api/SolvingHistories/SolvingHistoryDto";
import { number } from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';
import { SolvingHistoriesFilterBlock } from "../../components/FilterBlocks/SolvingHistoriesFilterBlock";

enum TestMode {
    OrdinaryMode,
    IntervalMode
}

export function GetSolvingHistories() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [solvingHistories, setSolvingHistories] = useState<SolvingHistoryDto[]>([]);

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 5;

    const [testMode, setTestMode] = useState<TestMode>(TestMode.OrdinaryMode);

    const test: TestDto = location.state?.testData;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                if (!test)
                    return;

                const solvingHistoriesResponse = await SolvingHistories.getWithPagination(page, PAGE_SIZE, test.id);
                setSolvingHistories(solvingHistoriesResponse.data.result!.items);
            } 
            catch (error: any) {
                console.log(error);

                error.response.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page])

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    const changeTestMode = (testMode: TestMode) => setTestMode(testMode);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[1-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }
    };

    const handleFilter = async (userName: string, email: string, orderBy: string) => {
        try {
            const response = await SolvingHistories.getWithPagination(page, PAGE_SIZE, test.id, userName, email, orderBy)

            setSolvingHistories(response.data.result!.items);
        }
        catch (error: any) {
            error.response.data.responseErrors.forEach((e: { message: string }) => {
                toast.error(e.message);
            });
        }
    }

    return (
        <div>
            <div style={{margin: "20px", width: "calc(100% - 40px)", display: 'flex', gap: 8}}>
                <Button
                    variant="contained" 
                    color={testMode === TestMode.OrdinaryMode ? 'primary' : 'inherit'}
                    onClick={() => changeTestMode(TestMode.OrdinaryMode)}
                    sx={{
                        color: 'white',
                        width: "100%",
                        wordBreak: 'break-all',
                    }}
                    >
                    Обычный режим
                </Button>

                <Button
                    variant="contained" 
                    color={testMode === TestMode.IntervalMode ? 'primary' : 'inherit'}
                    onClick={() => changeTestMode(TestMode.IntervalMode)}
                    sx={{
                        color: 'white',
                        width: "100%",
                        wordBreak: 'break-all',
                    }}
                    >
                    Режим интервальных повторений
                </Button>
            </div>

            <SolvingHistoriesFilterBlock onFilter={handleFilter}>
                
            </SolvingHistoriesFilterBlock>

            <div style={{margin: "20px", width: "calc(100% - 40px)", display: "flex", height: "50px"}}>
                <ToggleButtonGroup
                    exclusive
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned" onClick={() => setPage(page > 1 ? page - 1 : 1)}>
                        <ArrowBackIosIcon />
                    </ToggleButton>

                    <TextField 
                        sx={{ 
                            '& .MuiInputBase-root': { height: 50, width: 50 }
                        }}
                        value={page}
                        variant="outlined"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setPage(number.parse(e.target.value))}
                        style={{ height: "10px", textAlign: "center" }} 
                    />

                    <ToggleButton value="right" aria-label="right aligned" onClick={() => setPage(page + 1)}>
                        <ArrowForwardIosIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>


            {testMode === TestMode.OrdinaryMode 
            ?
            solvingHistories.map((solvingHistory, index) => (
                <SolvingHistoryCard solvingHistory={solvingHistory}></SolvingHistoryCard>
            ))
            : 
            <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: "left", width: "100%", marginTop: "10px" }}>
                {test.tasks.map((task, index) => (
                    <VerdictIntervalTaskCard
                        imageUrl="https://pic.rutubelist.ru/playlist/bf544654-e5e5-11ef-b595-02420a00066a.jpg"
                        audioUrl={task.audioPath}
                        nameCardInfo={task.taskName}
                        message={task.taskMessage}
                        taskStatistic={task.taskStatistic}
                        progressValue={1 - calculatePriorityNumber(task.taskStatistic)}
                        rightAnswer={task.rightAnswer ?? ""}
                        answers={task.answers}>
                    </VerdictIntervalTaskCard>
                ))}
            </div>}
        </div>
    )
}