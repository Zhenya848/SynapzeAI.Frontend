import { Button, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TestDto } from "../../../models/Api/Tests/TestDto";
import { useAuth } from "../../../components/context/auth/useAuth";
import { LimitTimeDto } from "../../../models/Api/Tests/LimitTimeDto";
import { CreateTaskDto } from "../../../models/Api/Tasks/CreateTaskDto";
import { Tests } from "../../../api/Endpoints/tests";
import { TaskCard } from "../../../components/Tasks/TaskCard";
import { TaskDto } from "../../../models/Api/Tasks/TaskDto";

export function CreateTest() {
    const [testName, setTestName] = useState<string>("");
    const [testNameError, setTestNameError] = useState(false);

    const [testTheme, setTestTheme] = useState<string>("");
    const [testThemeError, setTestThemeError] = useState(false);

    const [testSeconds, setTestSeconds] = useState<string>("");
    const [testMinutes, setTestMinutes] = useState<string>("");
    const [testTasks, setTestTasks] = useState<TaskDto[]>([]);

    const [isPublished, setIsPublished] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const test: TestDto = location.state?.testData;

    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (test) {
            setTestName(test.testName);
            setTestTheme(test.theme);
            setTestSeconds((test.limitTime ? test.limitTime.seconds.toString() : ""))
            setTestMinutes((test.limitTime ? test.limitTime.minutes.toString() : ""))
            setTestTasks(test.tasks);
            setIsPublished(test.isPublished);
        }
    }, []);

    if (!user) {
        return <Typography>401 unauthorized</Typography>;
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }
    };

    const generateTestData = () => {
        const testData: TestDto = 
        { 
            uniqueUserName: user?.uniqueUserName,
            testName: testName, 
            theme: testTheme, 
            limitTime: (testSeconds && testMinutes ? { seconds: Number.parseInt(testSeconds), minutes: Number.parseInt(testMinutes) } as LimitTimeDto : null), 
            isPublished: isPublished,
            tasks: testTasks
        } as TestDto

        return testData;
    }

    const handleCancel = () => {
        navigate("/tests");
    }

    const handleCreateTask = () => {
        const testData: TestDto = generateTestData();

        navigate("/tasks/create", { state: {testData} })
    }

    const handleDeleteTask = (taskId: string) => {
        setTestTasks(testTasks.filter(t => t.id !== taskId))
    }

    const handleUpdateTask = (taskId: string) => {
        const testData: TestDto = generateTestData();

        navigate("/tasks/update", { state: {testData, taskId} })
    }

    const handleCreateTest = async () => {
        let isValid = true

        if (testName.length < 1) {
            setTestNameError(true);
            toast.error("Название викторины не может быть пустым");

            isValid = false;
        }

        if (testTheme.length < 1) {
            setTestThemeError(true);
            toast.error("Название темы не может быть пустым");

            isValid = false;
        }

        if (isValid == false)
            return;

        const tasks: CreateTaskDto[] = testTasks.map(taskDto => ({
            taskName: taskDto.taskName,
            taskMessage: taskDto.taskMessage,
            rightAnswer: taskDto.rightAnswer || '',
            answers: taskDto.answers || []
        }));

        const seconds = testSeconds ? Number.parseInt(testSeconds) : undefined;
        const minutes = testMinutes ? Number.parseInt(testMinutes) : undefined;

        if (user) {
            try {
                setIsLoading(true);
                await Tests.create(user.id, user.uniqueUserName, testName, testTheme, isPublished, tasks, seconds, minutes);
                
                navigate("/tests");
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
    }

    const handleSwitchIsPublished = (isPublished: boolean) => setIsPublished(isPublished);

    return (
        <div style={{margin: "10px"}}>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: "flex-start" }}>
                <div style={{width: "100%", marginLeft: "10px"}}>
                    <TextField 
                        id="outlined-basic"
                        value={testName} 
                        onChange={(e) => setTestName(e.target.value)}
                        label="Название" 
                        variant="outlined"
                        error={testNameError}
                        style={{ width: "100%" }}
                    />

                    <TextField 
                        id="outlined-basic"
                        value={testTheme} 
                        onChange={(e) => setTestTheme(e.target.value)}
                        label="Тема" 
                        variant="outlined"
                        error={testThemeError}
                        style={{ width: "100%", marginTop: "20px" }}
                    />

                    <Typography variant="h6" style={{ marginTop: "20px" }}>Ограничения по времени</Typography>

                    <div style={{ display: "flex", marginTop: "10px"}}>
                        <TextField 
                            id="outlined-basic" 
                            value={testSeconds} 
                            label="Секунд" 
                            type = "number" 
                            onKeyDown={handleKeyDown} 
                            onChange={(e) => setTestSeconds(e.target.value)} 
                            variant="outlined" 
                            style={{ width: "100%" }} 
                        />

                        <TextField 
                            id="outlined-basic" 
                            value={testMinutes}  
                            label="Минут" 
                            type = "number" 
                            onKeyDown={handleKeyDown} 
                            onChange={(e) => setTestMinutes(e.target.value)} 
                            variant="outlined" 
                            style={{ width: "100%", marginLeft: "10px" }} 
                        />
                    </div>

                    <FormControlLabel
                        value="end"
                        control={<Switch color="primary"checked={isPublished} name="loading" onChange={() => handleSwitchIsPublished(isPublished === false)} />}
                        label="Публичный доступ"
                        labelPlacement="end"
                        sx={{marginTop: "20px"}}
                    />
                </div>
            </div>

            <div style={{ display: "flex", marginTop: "40px"}}>
                <Typography variant="h5" style={{ marginLeft: "20px", width: "100%" }}>Задачи</Typography>
                <p style={{marginRight: "20px"}}><Button variant="contained" color="success" onClick={handleCreateTask} sx={{ color: 'white'}} startIcon={<AddIcon />}>Добавить</Button></p>
            </div>

            <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: "left" }}>
                {testTasks.map(task => (
                    <TaskCard 
                        taskId={task.id}
                        imageUrl="https://pic.rutubelist.ru/playlist/bf544654-e5e5-11ef-b595-02420a00066a.jpg"
                        audioUrl={task.audioPath ?? ""}
                        nameCardInfo={task.taskName}
                        message={task.taskMessage}
                        rightAnswer={task.rightAnswer ?? ""}
                        answers={task.answers}
                        onDelete={handleDeleteTask}
                        onUpdate={handleUpdateTask}>
                    </TaskCard>
                ))}
            </div>

            <div style={{ display: "flex", margin: "40px", justifyContent: "center"}}>
                <Button variant="contained" color="success" onClick={handleCreateTest} sx={{ width: "90%", color: 'white'}} disabled={isLoading} startIcon={<CheckIcon />}>Создать</Button>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "90%", color: 'white', marginLeft: "20px"}} startIcon={<ClearIcon />}>Отмена</Button>
            </div> 
        </div>
    )
}