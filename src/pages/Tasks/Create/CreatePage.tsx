import { Button, TextField, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Test } from "../../../entities/test/Test";
import { ChangedTask } from "../../../features/tasks/model/ChangedTask";
import { ChangeType } from "../../../features/tasks/model/ChangeType";
import { TagInput } from "../../../widgets/TagInput";
import { Task } from "../../../entities/task/Task";
import { useSetUser } from "../../../shared/helpers/api/useSetUser";
import { toast } from "react-toastify";

export function CreateTask() {
    const [taskName, setTaskName] = useState<string>("");
    const [taskNameError, setTaskNameError] = useState(false);
    const [taskMessage, setTaskMessage] = useState<string>("");
    const [taskMessageError, setTaskMessageError] = useState(false);
    const [taskRightAnswer, setTaskRightAnswer] = useState<string>("");
    const [taskAnswers, setTaskAnswers] = useState<string[]>();

    const navigate = useNavigate();
    const location = useLocation();

    const test: Test = location.state?.testData;
    const chTasks: ChangedTask[] = location.state?.changedTasks;

    const setUser = useSetUser();

    useEffect(() => {
        if (!test) {
            navigate("/tests");
            return;
        }

        setUser();
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
                id: test.tasks.length.toString(),
                taskName: taskName,
                taskMessage: taskMessage,
                rightAnswer: taskRightAnswer,
                answers: taskAnswers
            } as Task

            const testData = {
                id: test.id,
                uniqueUserName: test.uniqueUserName,
                testName: test.testName, 
                theme: test.theme, 
                limitTime: test.limitTime, 
                isPublished: test.isPublished,
                tasks: [...test.tasks, task]
            } as Test

            if (chTasks) {
                const changedTask: ChangedTask = { task: task, changeType: ChangeType.created } as ChangedTask
                const changedTasks = [...chTasks, changedTask]

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
                    <TextField id="outlined-basic" label="Название" onChange={(e) => setTaskName(e.target.value)} error={taskNameError} variant="outlined" style={{ width: "100%" }} />
                    <TextField id="outlined-basic" label="Сообщение" onChange={(e) => setTaskMessage(e.target.value)} error={taskMessageError}  variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
                    <TextField id="outlined-basic" label="Правильный ответ" onChange={(e) => setTaskRightAnswer(e.target.value)}  variant="outlined" style={{ width: "100%", marginTop: "20px" }} />

                    <Typography variant="h6" style={{ marginTop: "20px" }}>Варианты ответа для пользователя</Typography>

                    <TagInput label="Варианты ответа" placeholderText="Введите варианты ответа, которые может выбрать пользователь" onChange={handleTagsChange}></TagInput>
                </div>
            </div>

            <div style={{display: 'flex', height: '46vh', alignItems: "flex-end", justifyItems: "flex-end"}}>
                <Button variant="contained" color="success" onClick={handleConfirm} sx={{ width: "90%", color: 'white'}} startIcon={<CheckIcon />}>Создать</Button>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "90%", color: 'white', marginLeft: "20px"}} startIcon={<ClearIcon />}>Отмена</Button>
            </div>
        </div>
    )
}