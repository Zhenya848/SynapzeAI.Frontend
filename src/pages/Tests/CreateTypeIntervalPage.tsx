import { Button, Card, CardMedia, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import { TaskCard } from "../../components/TaskCard";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation, useNavigate } from "react-router-dom";
import { TestDto } from "../../models/Dtos/TestDto";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/context/auth/useAuth";
import { Tests } from "../../api/tests";
import { CreateTaskDto } from "../../models/Api/CreateTaskDto";
import { toast } from "react-toastify";

export function CreateIntervalTest() {
    const [testName, setTestName] = useState<string>("");
    const [testNameError, setTestNameError] = useState(false);

    const [testTheme, setTestTheme] = useState<string>("");
    const [testThemeError, setTestThemeError] = useState(false);

    const [testIsPublished, setTestIsPublished] = useState<boolean>(true);

    const navigate = useNavigate();
    const location = useLocation();
    const test: TestDto = location.state?.testData;

    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (test) {
            setTestName(test.testName);
            setTestTheme(test.theme);
            setTestIsPublished(test.isPublished);
        }
    }, []);

    const handleCreateTask = () => {
        const testData: TestDto = 
        { 
            testName: testName, 
            theme: testTheme,
            isPublished: testIsPublished,
            tasks: (test ? test.tasks : [])
        } as TestDto

        navigate("/tasks/create", { state: {testData} })
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

        const tasks: CreateTaskDto[] = test
        ? test.tasks.map(taskDto => ({
            taskName: taskDto.taskName,
            taskMessage: taskDto.taskMessage,
            rightAnswer: taskDto.rightAnswer || '',
            answers: taskDto.answers || []
        }))
        : [];

        if (user) {
            try {
                setIsLoading(true);
                await Tests.create(user.id, testName, testTheme, testIsPublished, tasks);
                
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
                        imageUrl="https://pic.rutubelist.ru/playlist/bf544654-e5e5-11ef-b595-02420a00066a.jpg"
                        audioUrl={task.audioPath ?? ""}
                        nameCardInfo={task.taskName}
                        message={task.taskMessage}
                        rightAnswer={task.rightAnswer ?? ""}
                        answers={task.answers}>
                    </TaskCard >
                ))}
            </div>

            <div style={{ display: "flex", margin: "40px", justifyContent: "center"}}>
                <Button variant="contained" color="success" onClick={handleCreateTest} sx={{ width: "90%", color: 'white'}} startIcon={<CheckIcon />}>Создать</Button>
                <Button variant="contained" color="error" sx={{ width: "90%", color: 'white', marginLeft: "20px"}} startIcon={<ClearIcon />}>Отмена</Button>
            </div> 
        </div>
    )
}