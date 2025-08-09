import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SolvingHistories } from "../../api/Endpoints/solvingHistories";
import { SolvingHistoryDto } from "../../models/Dtos/SolvingHistories/SolvingHistoryDto";
import { toast } from "react-toastify";
import { Button, Table, Typography } from "@mui/material";
import { SolvingHistoryCard } from "../../components/SolvingHistories/SolvingHistoryCard";
import { TestDto } from "../../models/Dtos/Tests/TestDto";
import { VerdictIntervalTaskCard } from "../../components/Tasks/VerdictIntervalTaskCard";
import { calculatePriorityNumber } from "../../models/Tasks/CalculatePriorityNumber";

enum TestMode {
    OrdinaryMode,
    IntervalMode
}

export function GetSolvingHistories() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [solvingHistories, setSolvingHistories] = useState<SolvingHistoryDto[]>([]);

    const [testMode, setTestMode] = useState<TestMode>(TestMode.OrdinaryMode);

    const test: TestDto = location.state?.testData;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                if (!test)
                    return;

                const solvingHistoriesResponse = await SolvingHistories.get(test.id);
                setSolvingHistories(solvingHistoriesResponse.data.result!);
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
    }, [])

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    const changeTestMode = (testMode: TestMode) => setTestMode(testMode);

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