import { Button, Card, CardContent, CardMedia, TextField, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { TagInput } from "../../components/TagInput";
import { useLocation, useNavigate } from "react-router-dom";
import { TestDto } from "../../models/Dtos/TestDto";
import { useState } from "react";
import { TaskDto } from "../../models/Dtos/TaskDto";

export function CreateTask() {
    const [taskName, setTaskName] = useState<string>("");
    const [taskMessage, setTaskMessage] = useState<string>("");
    const [taskRightAnswer, setTaskRightAnswer] = useState<string>("");
    const [taskAnswers, setTaskAnswers] = useState<string[]>();

    const navigate = useNavigate();
    const location = useLocation();
    const test: TestDto = location.state?.testData;

    const handleCancel = () => {
        navigate("/tests/create", { state: {testData: test} })
    }

    const handleTagsChange = (newTags: string[]) => {
        setTaskAnswers(newTags);
    };

    const handleConfirm = () => {
        if (test) {
            const task = {
                id: test.tasks.length.toString(),
                taskName: taskName,
                taskMessage: taskMessage,
                rightAnswer: taskRightAnswer,
                answers: taskAnswers
            } as TaskDto

            const testData = {
                testName: test.testName, 
                theme: test.theme, 
                limitTime: test.limitTime, 
                isPublished: test.isPublished,
                tasks: [...test.tasks, task]
            } as TestDto

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

                    <Card sx={{ marginTop: "10px", width: 400 }}>
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
                    <TextField id="outlined-basic" label="Название" onChange={(e) => setTaskName(e.target.value)} variant="outlined" style={{ width: "100%" }} />
                    <TextField id="outlined-basic" label="Сообщение" onChange={(e) => setTaskMessage(e.target.value)}  variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
                    <TextField id="outlined-basic" label="Правильный ответ" onChange={(e) => setTaskRightAnswer(e.target.value)}  variant="outlined" style={{ width: "100%", marginTop: "20px" }} />

                    <Typography variant="h6" style={{ marginTop: "20px" }}>Варианты ответа для пользователя (не обязательно)</Typography>

                    <TagInput label="Варианты ответа" placeholderText="Введите варианты ответа, которые может выбрать пользователь" onChange={handleTagsChange}></TagInput>
                </div>
            </div>

            <div style={{display: 'flex', height: '46vh', alignItems: "flex-end"}}>
                <Button variant="contained" color="success" onClick={handleConfirm} sx={{ width: "90%", color: 'white'}} startIcon={<CheckIcon />}>Создать</Button>
                <Button variant="contained" color="error" onClick={handleCancel} sx={{ width: "90%", color: 'white', marginLeft: "20px"}} startIcon={<ClearIcon />}>Отмена</Button>
            </div>
        </div>
    )
}