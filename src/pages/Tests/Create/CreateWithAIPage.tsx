import { Button, Card, CardMedia, FormControlLabel, Slider, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../../components/context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from "react-toastify";
import { Tests } from "../../../api/Endpoints/tests";

export function CreateTestWithAI() {
    const navigate = useNavigate();

    const [testTheme, setTestTheme] = useState<string>("");
    const [testThemeError, setTestThemeError] = useState(false);

    const [tasksCount, setTasksCount] = useState<string>("");

    const { user } = useAuth();

    const [testSeconds, setTestSeconds] = useState<string>("");
    const [testMinutes, setTestMinutes] = useState<string>("");

    const [percentOfOpenTasks, setPercentOfOpenTasks] = useState<string>("");
    const [difficulty, setDifficulty] = useState<string>("");

    const [isTimeLimited, setIsTimeLimited] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }
    };

    const difficultyMarks = [
        {
            value: 0,
            label: 'На изич',
        },
        {
            value: 25,
            label: 'Легко',
        },
        {
            value: 50,
            label: 'Нормально',
        },
        {
            value: 75,
            label: 'Сложно',
        },
        {
            value: 100,
            label: 'Кошмар',
        },
    ];

    const taskMarks = [
        {
            value: 15,
            label: 'С открытым ответом',
        },
        {
            value: 85,
            label: 'На выбор ответа',
        },
    ];

    function valueLabelFormat(value: number) {
        return `${value}%`;
    }

    const handleSwitchIsTimeLimited = (isLimited: boolean) => setIsTimeLimited(isLimited);

    const handleCreateTest = async () => {
        let isValid = true;

        if (testTheme.length === 0) {
            isValid = false;
            
            toast.error("Тема не может быть пустой");
            setTestThemeError(true);
        }

        if (isValid == false)
            return;

        const seconds = testSeconds ? Number.parseInt(testSeconds) : undefined;
        const minutes = testMinutes ? Number.parseInt(testMinutes) : undefined;

        const percentOfOpenTasksNum = percentOfOpenTasks ? Number.parseInt(percentOfOpenTasks) : 50;
        const tasksCountNum = tasksCount ? Number.parseInt(tasksCount) : 5;
        const difficultyNum = difficulty ? Number.parseInt(difficulty) : 50;

        if (user) {
            try {
                setIsLoading(true);
                await Tests.createWithAI(user.id, testTheme, isTimeLimited, percentOfOpenTasksNum, tasksCountNum, difficultyNum, seconds, minutes);
                
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

    const handleCancel = () => {
        navigate("/tests");
    }

    return (
        <div style={{margin: "10px"}}>
            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: "center"}}>
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://i.pinimg.com/originals/0b/ae/97/0bae97a138f2cd95c739ef87685cfc92.jpg"
                        alt="image"
                    />

                    <Button variant="contained" disableElevation style={{ width: "100%" }}>
                        Редактировать файл
                    </Button>
                </Card>

                <TextField 
                    id="outlined-basic"
                    value={testTheme} 
                    onChange={(e) => setTestTheme(e.target.value)}
                    label="Тема"
                    variant="outlined"
                    error={testThemeError}
                    style={{ width: "100%", marginTop: "20px" }}
                />

                <TextField 
                    id="outlined-basic" 
                    value={tasksCount} 
                    label="Кол - во задач" 
                    type = "number" 
                    onKeyDown={handleKeyDown} 
                    onChange={(e) => setTasksCount(e.target.value)} 
                    variant="outlined" 
                    style={{ width: "100%", marginTop: "20px" }} 
                />

                <FormControlLabel
                    value="end"
                    control={<Switch color="primary" checked={isTimeLimited} name="loading" onChange={() => handleSwitchIsTimeLimited(isTimeLimited === false)} />}
                    label="Ограничение по времени"
                    labelPlacement="end"
                    sx={{marginTop: "20px"}}
                />

                {isTimeLimited && 
                (<div style={{ display: "flex", marginTop: "10px", width: '100%'}}>
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
                </div>)}
                

                <Typography variant="h6" style={{ marginTop: "40px" }}>Сложность задач</Typography>

                <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    step={1}
                    valueLabelFormat={valueLabelFormat}
                    onChange={(event, newValue) => setDifficulty(newValue.toString())}
                    valueLabelDisplay="auto"
                    marks={difficultyMarks}
                    sx={{maxWidth: "82vw"}}
                />

                <Typography variant="h6" style={{ marginTop: "80px" }}>Процент задач с открытым ответом или на выбор</Typography>

                <Slider
                    aria-label="Custom marks"
                    defaultValue={20}
                    step={1}
                    valueLabelFormat={valueLabelFormat}
                    onChange={(event, newValue) => setPercentOfOpenTasks(newValue.toString())}
                    valueLabelDisplay="auto"
                    marks={taskMarks}
                    sx={{maxWidth: "82vw"}}
                />
            </div>

            <div style={{ display: "flex", margin: "40px", justifyContent: "center"}}>
                <Button variant="contained" color="success" onClick={handleCreateTest} sx={{ width: "90%", color: 'white'}} disabled={isLoading} startIcon={<CheckIcon />}>Создать</Button>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "90%", color: 'white', marginLeft: "20px"}} startIcon={<ClearIcon />}>Отмена</Button>
            </div> 
        </div>)
}