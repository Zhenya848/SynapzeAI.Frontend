import { Button, Card, CardContent, CardMedia, TextField, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Test } from "../../../entities/test/Test";
import { ChangedTask } from "../../../features/tasks/model/ChangedTask";
import { ChangeType } from "../../../features/tasks/model/ChangeType";
import { TagInput } from "../../../widgets/TagInput";
import { Task } from "../../../entities/task/Task";
import { useSetUser } from "../../../shared/helpers/api/useSetUser";
import { toast } from "react-toastify";

export function UpdateTask() {
    const [taskName, setTaskName] = useState<string>("");
    const [taskNameError, setTaskNameError] = useState(false);
    const [taskMessage, setTaskMessage] = useState<string>("");
    const [taskMessageError, setTaskMessageError] = useState(false);
    const [taskRightAnswer, setTaskRightAnswer] = useState<string>("");
    const [taskAnswers, setTaskAnswers] = useState<string[]>();

    const navigate = useNavigate();
    const location = useLocation();

    const test: Test = location.state?.testData;
    const taskId: string = location.state?.taskId;
    const chTasks: ChangedTask[] = location.state?.changedTasks;

    const setUser = useSetUser();

    useEffect(() => {
        if (!test || !taskId) {
            navigate("/tests");
            return;
        }

        setUser();
    }, []);

    useEffect(() => {
        if (test) {
            const task = test.tasks.find(t => t.id === taskId);

            if (task) {
                setTaskName(task.taskName);
                setTaskMessage(task.taskMessage);
                setTaskRightAnswer(task.rightAnswer ?? "");
                setTaskAnswers(task.answers);
            }
        }
    }, []);

    const handleCancel = () => {
        const testData = test;

        if (chTasks) {
            const changedTasks = chTasks;

            navigate("/tests/update", { state: {testData, changedTasks}})
        }
        else
            navigate("/tests/create", { state: {testData} })
    }

    const handleTagsChange = (newTags: string[]) => {
        setTaskAnswers(newTags);
    };

    const handleConfirm = () => {
        let isValid = true;

        if (taskName.length < 1) {
            setTaskNameError(true);
            toast.error("Название задачи не может быть пустым");

            isValid = false;
        }

        if (taskMessage.length < 1) {
            setTaskMessageError(true);
            toast.error("Сообщение задачи не может быть пустым");

            isValid = false;
        }

        if (isValid && test) {
            const task = {
                id: taskId,
                taskName: taskName,
                taskMessage: taskMessage,
                rightAnswer: taskRightAnswer,
                answers: taskAnswers
            } as Task

            const testData = structuredClone({
                ...test,
                tasks: test.tasks.map(t => t.id === taskId ? task : t)
            }) as Test;

            if (chTasks) {
                const changedTask: ChangedTask = { task: task, changeType: ChangeType.updated } as ChangedTask;

                const indexOfPreviousCreatedTask = chTasks.filter(t => t.changeType === ChangeType.created)
                    .findIndex(t => t.task.id === taskId);

                if (indexOfPreviousCreatedTask !== -1) {
                    changedTask.changeType = ChangeType.created;
                    chTasks[indexOfPreviousCreatedTask] = changedTask;
                }

                const indexOfPreviousUpdatedTask = chTasks.findIndex(t => t.task.id === changedTask.task.id)

                if (indexOfPreviousUpdatedTask !== -1)
                    chTasks[indexOfPreviousUpdatedTask] = changedTask

                const changedTasks = indexOfPreviousUpdatedTask !== -1 || indexOfPreviousCreatedTask !== -1 ? chTasks : [...chTasks, changedTask]

                navigate("/tests/update", { state: {testData, changedTasks}})
            }
            else
                navigate("/tests/create", { state: {testData} })
        }
    }

    return (
        <div style={{margin: "10px"}}>
            <div style={{ display: 'flex', alignItems: "flex-start" }}>
                <div style={{width: "100%", marginLeft: "10px"}}>
                    <TextField id="outlined-basic" label="Название" value={taskName} error={taskNameError} onChange={(e) => setTaskName(e.target.value)} variant="outlined" style={{ width: "100%" }} />
                    <TextField id="outlined-basic" label="Сообщение" value={taskMessage} error={taskMessageError} onChange={(e) => setTaskMessage(e.target.value)}  variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
                    <TextField id="outlined-basic" label="Правильный ответ" value={taskRightAnswer} onChange={(e) => setTaskRightAnswer(e.target.value)}  variant="outlined" style={{ width: "100%", marginTop: "20px" }} />

                    <Typography variant="h6" style={{ marginTop: "20px" }}>Варианты ответа для пользователя</Typography>

                    <TagInput label="Варианты ответа" placeholderText="Введите варианты ответа, которые может выбрать пользователь" currentTags={test.tasks.find(t => t.id === taskId)?.answers} onChange={handleTagsChange}></TagInput>
                </div>
            </div>

            <div style={{display: 'flex', height: '43vh', alignItems: "flex-end"}}>
                <Button variant="contained" color="info" onClick={handleConfirm} sx={{ width: "90%", color: 'white'}} startIcon={<SaveIcon />}>Сохранить</Button>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "90%", color: 'white', marginLeft: "20px"}} startIcon={<ClearIcon />}>Отмена</Button>
            </div>
        </div>
    )
}