import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { StatisticTask } from "../models/Tasks/StatisticTask";
import { VerdictIntervalTaskCard } from "../components/Tasks/VerdictIntervalTaskCard";
import { TestDto } from "../models/Api/Tests/TestDto";
import { useEffect, useState } from "react";
import { UpdateTaskStatisticDto } from "../models/Api/Tasks/UpdateTaskStatisticDto";
import { Tests } from "../api/Endpoints/tests";
import { toast } from "react-toastify";
import { useAuth } from "../components/context/auth/useAuth";

export function VerdictIntervalPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);

    const test: TestDto = location.state?.testData;
    const statisticTasks: StatisticTask[] = location.state?.statisticTasksData;

    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                if (!user || !test || test.tasks.length < 1)
                    return;

                const tasks: UpdateTaskStatisticDto[] = statisticTasks.map((task, index) => ({
                    taskId: test.tasks[index].id,
                    errorsCount: task.taskStatistic.errorsCount,
                    rightAnswersCount: task.taskStatistic.rightAnswersCount,
                    lastReviewTime: task.taskStatistic.lastReviewTime,
                    avgTimeSolvingSec: task.taskStatistic.avgTimeSolvingSec,
                }))

                await Tests.updateTasksStatistic(user.id, test.id, tasks);
            } 
            catch (error: any) {
                error.response.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    const handleCancel = () => {
        navigate("/tests");
    }

    return (
        <div style={{margin: "10px", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Typography variant="h4">Викотрина пройдена!</Typography>

            <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: "left", width: "100%", marginTop: "10px" }}>
                {test.tasks.map((task, index) => (
                    <VerdictIntervalTaskCard
                        nameCardInfo={task.taskName}
                        message={task.taskMessage}
                        taskStatistic={statisticTasks.find(i => i.taskIndex === index)?.taskStatistic}
                        progressValue={1 - (statisticTasks.find(i => i.taskIndex === index)?.priorityNumber ?? 1)}
                        rightAnswer={task.rightAnswer ?? ""}
                        answers={task.answers}>
                    </VerdictIntervalTaskCard>
                ))}
            </div>

            <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "100%", color: 'white'}} startIcon={<ClearIcon />}>Выйти</Button>
        </div>
    )
}