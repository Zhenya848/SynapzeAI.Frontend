import { Button, Card, CardContent, CardMedia, TextField, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Test } from "../../../entities/test/Test";
import { ChangedTask } from "../../../features/tasks/model/ChangedTask";
import { ChangeType } from "../../../features/tasks/model/ChangeType";
import { TagInput } from "../../../widgets/TagInput";
import { Task } from "../../../entities/task/Task";
import { useSetUser } from "../../../shared/helpers/api/useSetUser";

export function UpdateTask() {
    const [taskName, setTaskName] = useState<string>("");
    const [taskMessage, setTaskMessage] = useState<string>("");
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
        if (test) {
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
                <div>
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

                    <Card sx={{ marginTop: "10px", maxWidth: 400 }}>
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <AudioFileIcon sx={{ fontSize: 60 }} color="primary" />
                            <Typography variant="body1" sx={{ wordBreak: "break-word" }}></Typography>
                        </CardContent>

                        <Button variant="contained" color="secondary" disableElevation style={{ width: "100%", color: 'white' }}>
                            Редактировать аудио
                        </Button>
                    </Card>
                </div>

                <div style={{width: "100%", marginLeft: "10px"}}>
                    <TextField id="outlined-basic" label="Название" value={taskName} onChange={(e) => setTaskName(e.target.value)} variant="outlined" style={{ width: "100%" }} />
                    <TextField id="outlined-basic" label="Сообщение" value={taskMessage} onChange={(e) => setTaskMessage(e.target.value)}  variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
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