import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { StatisticTask } from "../features/tasks/model/StatisticTask";
import { VerdictIntervalTaskCard } from "../entities/task/components/VerdictIntervalTaskCard";
import { Test } from "../entities/test/Test";
import { useEffect } from "react";
import { UpdateTaskStatisticDto } from "../entities/taskStatistic/api/UpdateTaskStatisticDto";
import { toast } from "react-toastify";
import { useUpdateTasksStatisticsMutation } from "../features/tests/api";

export function VerdictIntervalPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const test: Test = location.state?.testData;
    const statisticTasks: StatisticTask[] = location.state?.statisticTasksData;

    const [updateTasksStatistics, {isLoading}] = useUpdateTasksStatisticsMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!test || test.tasks.length < 1) {
                    navigate("/tests");
                    return;
                }

                const tasks: UpdateTaskStatisticDto[] = statisticTasks.map((task, index) => ({
                    taskId: test.tasks[index].id,
                    errorsCount: task.taskStatistic.errorsCount,
                    rightAnswersCount: task.taskStatistic.rightAnswersCount,
                    lastReviewTime: task.taskStatistic.lastReviewTime,
                    avgTimeSolvingSec: task.taskStatistic.avgTimeSolvingSec,
                }))

                await updateTasksStatistics({ tasks: tasks }).unwrap();
            } 
            catch (error: any) {
                error.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            }
        };

        fetchData();
    }, [navigate, statisticTasks, test, updateTasksStatistics]);

    if (isLoading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 1}}>
                <CircularProgress variant="indeterminate" />
                <Typography variant="h4" color="primary">Загрузка...</Typography>
            </Box>
        )
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
                        key={index}
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