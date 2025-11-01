import { Button, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Test } from "../../../entities/test/Test";
import { ChangedTask } from "../../../features/tasks/model/ChangedTask";
import { ChangeType } from "../../../features/tasks/model/ChangeType";
import { CreateTaskDto } from "../../../entities/task/api/CreateTaskDto";
import { UpdateTaskDto } from "../../../entities/task/api/UpdateTaskDto";
import { TaskCard } from "../../../entities/task/components/TaskCard";
import { LimitTime } from "../../../entities/valueObjects/LimitTime";
import { Task } from "../../../entities/task/Task";
import { useUpdateTestMutation } from "../../../features/tests/api";
import { useSetUser } from "../../../shared/helpers/api/useSetUser";
import { getErrorMessages } from "../../../shared/utils/getErrorMessages";

export function UpdateTest() {
    const [testName, setTestName] = useState<string>("");
    const [testNameError, setTestNameError] = useState(false);

    const [testTheme, setTestTheme] = useState<string>("");
    const [testThemeError, setTestThemeError] = useState(false);

    const [testSeconds, setTestSeconds] = useState<string>("");
    const [testMinutes, setTestMinutes] = useState<string>("");

    const [isPublished, setIsPublished] = useState(true);

    const [testTasks, setTestTasks] = useState<Task[]>([]);

    const [changedTasks, setChangedTasks] = useState<ChangedTask[]>([]);

    const navigate = useNavigate();
    const location = useLocation();

    const test: Test = location.state?.testData;
    const chTasks: ChangedTask[] = location.state?.changedTasks;

    const [updateTest] = useUpdateTestMutation();

    const setUser = useSetUser();

    useEffect(() => {
        if (!test) {
            navigate("/tests");
            return;
        }

        setUser();
    }, []);

    useEffect(() => {
        if (test) {
            setTestName(test.testName);
            setTestTheme(test.theme);
            setTestSeconds((test.limitTime ? test.limitTime.seconds.toString() : ""))
            setTestMinutes((test.limitTime ? test.limitTime.minutes.toString() : ""))
            setIsPublished(test.isPublished);
            setTestTasks(test.tasks);
        }

        if (chTasks)
            setChangedTasks(chTasks);
    }, [chTasks, test]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }
    };

    const generateTestData = () => {
        const testData: Test = 
        { 
            id: test.id,
            uniqueUserName: test.uniqueUserName,
            testName: testName, 
            theme: testTheme, 
            limitTime: (testSeconds || testMinutes ? { seconds: Number.parseInt(testSeconds ?? 0), minutes: Number.parseInt(testMinutes ?? 0) } as LimitTime : null),
            isPublished: isPublished,
            tasks: testTasks
        } as Test

        return testData;
    }

    const handleCancel = () => {
        navigate("/tests");
    }

    const handleCreateTask = () => {
        const testData: Test = generateTestData();

        navigate("/tasks/create", { state: {testData, changedTasks} });
    }

    const handleUpdateTask = (taskId: string) => {
        const testData: Test = generateTestData();

        navigate("/tasks/update", { state: {testData, taskId, changedTasks} });
    }

    const handleDeleteTask = (taskId: string) => {
        const previousChangedTask = changedTasks
            .find(t => t.task.id === taskId);

        if (previousChangedTask != null)
            setChangedTasks(changedTasks.filter(t => t.task.id !== taskId))
        else {
            const deletedTask = testTasks.find(t => t.id === taskId);
            const changedDeletedTask: ChangedTask = { task: deletedTask, changeType: ChangeType.deleted } as ChangedTask
            
            setChangedTasks([...changedTasks, changedDeletedTask])
        }

        setTestTasks(testTasks.filter(t => t.id !== taskId))
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

        const createdTasks: CreateTaskDto[] = changedTasks.filter(ct => ct.changeType == ChangeType.created)
            .map(t => ({taskName: t.task.taskName, taskMessage: t.task.taskMessage, rightAnswer: t.task.rightAnswer, answers: t.task.answers} as CreateTaskDto));

        const updatedTasks: UpdateTaskDto[] = changedTasks.filter(ct => ct.changeType == ChangeType.updated)
            .map(t => ({taskId: t.task.id, taskName: t.task.taskName, taskMessage: t.task.taskMessage, rightAnswer: t.task.rightAnswer, answers: t.task.answers} as UpdateTaskDto));

        const deletedTasks: string[] = changedTasks.filter(ct => ct.changeType == ChangeType.deleted)
            .map(t => t.task.id);

        const seconds = testSeconds ? Number.parseInt(testSeconds) : undefined;
        const minutes = testMinutes ? Number.parseInt(testMinutes) : undefined;

        if (test) {
            try {
                await updateTest({ 
                    testId: test.id, 
                    testName: testName,
                    theme: testTheme,
                    isPublished: isPublished,
                    seconds: seconds,
                    minutes: minutes,
                    tasksToCreate: createdTasks,
                    tasksToUpdate: updatedTasks,
                    taskIdsToDelete: deletedTasks
                }).unwrap();

                navigate("/tests");
            } 
            catch (error: any) {
                getErrorMessages(error).map(error => {
                    toast.error(error);
                });
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

            <div style={{ 
                alignItems: "stretch", 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: "left"
            }}>
                {testTasks.map((task, index) => (
                    <TaskCard 
                        key={index}
                        taskId={task.id}
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