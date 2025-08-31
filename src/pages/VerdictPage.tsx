import { useLocation, useNavigate } from "react-router-dom";
import { AnswersHistory } from "../features/tasks/model/AswerHistory";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect, useState } from "react";
import { TaskHistory } from "../entities/taskHistory/TaskHistory";
import { toast } from "react-toastify";
import { Test } from "../entities/test/Test";
import PsychologyIcon from '@mui/icons-material/Psychology';
import { explainTasks } from "../features/AI/ExplainTasks";
import { VerdictTaskCard } from "../entities/task/components/VerdictTaskCard";
import { useCreateSolvingHistoryMutation, useUpdateAIMessagesForTasksMutation } from "../features/solvingHistories/api";
import { GetCookies } from "../shared/helpers/api/GetCookies";
import { useSelector } from "react-redux";
import { selectUser } from "../features/accounts/auth.slice";

export function VerdictPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [taskHistories, setTaskHistories] = useState<TaskHistory[]>([]);
    const [solvingHistoryId, setSolvingHistoryId] = useState<string>("");

    const test: Test = location.state?.testData;
    const answerHistory: AnswersHistory[] = location.state?.answerHistoryData;
    const expiredTime: number = location.state?.expiredTimeData;

    const [isLoading, setIsLoading] = useState(false);

    const isRefreshToken = GetCookies("refreshToken");
    const user = useSelector(selectUser);

    const [createSolvingHistory] = useCreateSolvingHistoryMutation();
    const [updateAIMessagesForTasks] = useUpdateAIMessagesForTasksMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                if (!test || test.tasks.length < 1 || !expiredTime || (isRefreshToken && !user)) {
                    navigate("/tests");
                    return;
                }

                const taskHistories: TaskHistory[] = test.tasks.map((task, index) => ({
                    serialNumber: task.serialNumber,
                    taskName: task.taskName,
                    taskMessage: task.taskMessage,
                    rightAnswer: task.rightAnswer,
                    userAnswer: answerHistory.find(i => i.taskIndex === index)?.answer ?? "none",
                    messageAI: ""
                }))
                
                const response = await createSolvingHistory({ 
                    testId: test.id, 
                    taskHistories: taskHistories, 
                    solvingDate: new Date(), 
                    solvingTimeSeconds: expiredTime
                }).unwrap();

                setSolvingHistoryId(response.result!);

                setTaskHistories(taskHistories);
            } 
            catch (error: any) {
                error.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [answerHistory, createSolvingHistory, expiredTime, navigate, test]);

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

    const handleRetry = () => {
        const testData = test;

        navigate("/tests/decide", { state: { testData } });
    }

    const handleExplain = async () => {
        try {
            setIsLoading(true);

            if (!test)
                return;

            const tasksToExplain = taskHistories.filter(t => !t.rightAnswer || t.userAnswer !== t.rightAnswer)
            const aiMessagesForTasks = await explainTasks(tasksToExplain);

            if (!aiMessagesForTasks)
                return;

            await updateAIMessagesForTasks({
                solvingHistoryId: solvingHistoryId, 
                aiMessagesForTasks: aiMessagesForTasks 
            });

            setTaskHistories(prev => {
                return prev.map((item, idx) => ({ ...item, messageAI: aiMessagesForTasks.find(v => v.taskSerialNumber === item.serialNumber)?.aiMessage ?? ""}));
            });
        }
        catch (error: any) {
            error.response.data.responseErrors.forEach((e: { message: string }) => {
                toast.error(e.message);
            });
        } 
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div style={{margin: "10px", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Typography variant="h4">Викотрина пройдена!</Typography>

            <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: "left", width: "100%", marginTop: "10px" }}>
                {taskHistories.map((taskHistory, index) => (
                    <VerdictTaskCard
                        key={index}
                        nameCardInfo={taskHistory.taskName}
                        message={taskHistory.taskMessage}
                        userAnswer={taskHistory.userAnswer}
                        rightAnswer={taskHistory.rightAnswer ?? ""}
                        answers={taskHistory.answers}
                        comment={taskHistory.messageAI}>
                    </VerdictTaskCard>
                ))}
            </div>

            <div style={{display: 'flex', width: "100%", marginTop: "10px", gap: 10}}>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "100%", color: 'white'}} startIcon={<ClearIcon />}>Выйти</Button>
                <Button variant="contained" color="secondary" onClick={handleExplain} sx={{ width: "100%", color: 'white'}} startIcon={<PsychologyIcon />}>Анализ с AI</Button>
                <Button variant="contained" color="primary" onClick={handleRetry} sx={{ width: "100%", color: 'white'}} startIcon={<ReplayIcon />}>Заново</Button>
            </div>
        </div>
    )
}