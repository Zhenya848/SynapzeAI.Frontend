import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';
import { StatisticTask } from "../models/Tasks/StatisticTask";
import { VerdictIntervalTaskCard } from "../components/Tasks/VerdictIntervalTaskCard";
import { TestDto } from "../models/Dtos/Tests/TestDto";

export function VerdictIntervalPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const test: TestDto = location.state?.testData;
    const statisticTasks: StatisticTask[] = location.state?.statisticTasksData;

    const handleCancel = () => {
        navigate("/tests");
    }

    const handleRetry = () => {
        const testData = test;

        navigate("/tests/decideWithInterval", { state: { testData } });
    }

    return (
        <div style={{margin: "10px", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Typography variant="h4">Викотрина пройдена!</Typography>

            <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: "left", width: "100%", marginTop: "10px" }}>
                {test.tasks.map((task, index) => (
                    <VerdictIntervalTaskCard
                        imageUrl="https://pic.rutubelist.ru/playlist/bf544654-e5e5-11ef-b595-02420a00066a.jpg"
                        audioUrl={task.audioPath}
                        nameCardInfo={task.taskName}
                        message={task.taskMessage}
                        taskStatistic={statisticTasks.find(i => i.taskIndex === index)?.taskStatistic!}
                        progressValue={1 - statisticTasks.find(i => i.taskIndex === index)?.priorityNumber!}
                        rightAnswer={task.rightAnswer ?? ""}
                        answers={task.answers}>
                    </VerdictIntervalTaskCard>
                ))}
            </div>

            <div style={{display: 'flex', width: "100%", marginTop: "10px"}}>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "100%", color: 'white'}} startIcon={<ClearIcon />}>Выйти</Button>
                <Button variant="contained" color="primary" onClick={handleRetry} sx={{ width: "100%", color: 'white', marginLeft: "20px"}} startIcon={<ReplayIcon />}>Заново</Button>
            </div>
        </div>
    )
}