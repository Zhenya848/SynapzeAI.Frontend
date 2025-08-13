import { useLocation, useNavigate } from "react-router-dom";
import { AnswersHistory } from "../models/Tasks/AswerHistory";
import { Button, Typography } from "@mui/material";
import { VerdictTaskCard } from "../components/Tasks/VerdictTaskCard";
import ClearIcon from '@mui/icons-material/Clear';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect, useState } from "react";
import { SolvingHistories } from "../api/Endpoints/solvingHistories";
import { TaskHistoryDto } from "../models/Api/SolvingHistories/TaskHistoryDto";
import { toast } from "react-toastify";
import { TestDto } from "../models/Api/Tests/TestDto";

export function VerdictPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [taskHistories, setTaskHistories] = useState<TaskHistoryDto[]>([]);
    const [solvingHistoryId, setSolvingHistoryId] = useState<string>("");

    const test: TestDto = location.state?.testData;
    const answerHistory: AnswersHistory[] = location.state?.answerHistoryData;
    const expiredTime: number = location.state?.expiredTimeData;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                if (!test || test.tasks.length < 1)
                    return;

                const taskHistories: TaskHistoryDto[] = test.tasks.map((task, index) => ({
                    serialNumber: task.serialNumber,
                    taskName: task.taskName,
                    taskMessage: task.taskMessage,
                    rightAnswer: task.rightAnswer,
                    imagePath: task.imagePath,
                    audioPath: task.audioPath,
                    userAnswer: answerHistory.find(i => i.taskIndex === index)?.answer ?? "none",
                    messageAI: ""
                }))

                if (!expiredTime)
                    return;

                const response = await SolvingHistories.create(test.tasks[0].testId, taskHistories, new Date(), expiredTime);
                setSolvingHistoryId(response.data.result!);

                setTaskHistories(taskHistories);
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

    const handleRetry = () => {
        const testData = test;

        navigate("/tests/decide", { state: { testData } });
    }

    const handleExplain = async () => {
        try {
            setIsLoading(true);
                
            if (!test)
                return;

            console.log(solvingHistoryId);

            const response = await SolvingHistories.explainSolvingTest(test.id, solvingHistoryId);
            const aiMessagesForTasks = response.data.result!;

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
                        imageUrl="https://pic.rutubelist.ru/playlist/bf544654-e5e5-11ef-b595-02420a00066a.jpg"
                        audioUrl={taskHistory.audioPath}
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
                <Button variant="contained" color="secondary" onClick={handleExplain} sx={{ width: "100%", color: 'white'}} startIcon={<ClearIcon />}>Анализ с AI</Button>
                <Button variant="contained" color="primary" onClick={handleRetry} sx={{ width: "100%", color: 'white'}} startIcon={<ReplayIcon />}>Заново</Button>
            </div>
        </div>
    )
}