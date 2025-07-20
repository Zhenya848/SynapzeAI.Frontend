import { Button, Card, CardMedia, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import { TaskCard } from "../../components/TaskCard";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useLocation, useNavigate } from "react-router-dom";
import { TestDto } from "../../models/Dtos/TestDto";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/auth/useAuth";
import { toast } from "react-toastify";
import { LimitTimeDto } from "../../models/LimitTimeDto";
import { Tests } from "../../api/tests";
import { CreateTaskDto } from "../../models/Api/CreateTaskDto";
import { TaskDto } from "../../models/Dtos/TaskDto";
import { ChangedTask } from "../../models/ChangedTask";
import { ChangeType } from "../../models/ChangeType";

export function UpdateTest() {
    const [testName, setTestName] = useState<string>("");
    const [testNameError, setTestNameError] = useState(false);

    const [testTheme, setTestTheme] = useState<string>("");
    const [testThemeError, setTestThemeError] = useState(false);

    const [testSeconds, setTestSeconds] = useState<string>("");
    const [testMinutes, setTestMinutes] = useState<string>("");
    const [testIsPublished, setTestIsPublished] = useState<boolean>(true);
    const [testTasks, setTestTasks] = useState<TaskDto[]>([]);

    const [changedTasks, setChangedTasks] = useState<ChangedTask[]>([]);

    const navigate = useNavigate();
    const location = useLocation();

    const test: TestDto = location.state?.testData;
    const chTasks: ChangedTask[] = location.state?.changedTasks;

    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (test) {
            setTestName(test.testName);
            setTestTheme(test.theme);
            setTestSeconds((test.limitTime ? test.limitTime.seconds.toString() : ""))
            setTestMinutes((test.limitTime ? test.limitTime.minutes.toString() : ""))
            setTestIsPublished(test.isPublished);
            setTestTasks(test.tasks);
        }

        if (chTasks)
            setChangedTasks(chTasks);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }
    };

    const generateTestData = () => {
        const testData: TestDto = 
        { 
            testName: testName, 
            theme: testTheme, 
            limitTime: (testSeconds && testMinutes ? { seconds: Number.parseInt(testSeconds), minutes: Number.parseInt(testMinutes) } as LimitTimeDto : null), 
            isPublished: testIsPublished,
            tasks: testTasks
        } as TestDto

        return testData;
    }

    const handleCancel = () => {
        navigate("/tests");
    }

    const handleCreateTask = () => {
        const testData: TestDto = generateTestData();

        navigate("/tasks/create", { state: {testData, changedTasks} });
    }

    const handleUpdateTask = (taskId: string) => {
        const testData: TestDto = generateTestData();

        navigate("/tasks/update", { state: {testData, taskId, changedTasks} });
    }

    const handleDeleteTask = (taskId: string) => {
        setTestTasks(testTasks.filter(t => t.id !== taskId))

        const deletedTask = testTasks.find(t => t.id === taskId);

        if (deletedTask) {
            const changedDeletedTask: ChangedTask = { task: deletedTask, changeType: ChangeType.deleted } as ChangedTask

            setChangedTasks([...changedTasks, changedDeletedTask])
        }
    }

    const handleUpdateTest = async () => {
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

        const createdTasks: TaskDto[] = changedTasks.filter(ct => ct.changeType == ChangeType.created).map(t => t.task);

        const seconds = testSeconds ? Number.parseInt(testSeconds) : undefined;
        const minutes = testMinutes ? Number.parseInt(testMinutes) : undefined;

        if (user && test) {
            try {
                setIsLoading(true);
                await Tests.update(test.id, testName, testTheme, testIsPublished, seconds, minutes);
                
                navigate("/tests");
            } 
            catch (error: any) {
                console.log(error)

                error.response.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            } 
            finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div style={{margin: "10px"}}>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: "flex-start" }}>
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://i.pinimg.com/originals/0b/ae/97/0bae97a138f2cd95c739ef87685cfc92.jpg"
                        alt="image"
                    />

                    <Button variant="contained" disableElevation style={{ width: "100%" }}>
                        Редактировать фото
                    </Button>
                </Card>

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

                    <FormControlLabel control={<Checkbox checked={testIsPublished} onChange={(e) => setTestIsPublished(e.target.checked)}/>} label="Опубликовать" style={{marginTop: "10px"}}/>
                </div>
            </div>
            

            <div style={{ display: "flex", marginTop: "40px"}}>
                <Typography variant="h5" style={{ marginLeft: "80px", width: "100%" }}>Задачи</Typography>
                <p style={{marginRight: "80px"}}><Button variant="contained" color="success" onClick={handleCreateTask} sx={{ color: 'white'}} startIcon={<AddIcon />}>Добавить</Button></p>
            </div>

            <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: "left" }}>
                {test?.tasks.map((task) => (
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
                    </TaskCard >
                ))}
            </div>

            <div style={{ display: "flex", margin: "40px", justifyContent: "center"}}>
                <Button variant="contained" color="info" onClick={handleUpdateTest} sx={{ width: "90%", color: 'white'}} startIcon={<SaveIcon />}>Сохранить</Button>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "90%", color: 'white', marginLeft: "20px"}} startIcon={<ClearIcon />}>Отмена</Button>
            </div> 
        </div>
    )
}