import { Box, Button, Card, CardMedia, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BuildIcon from '@mui/icons-material/Build';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ProgressBoxes from "../../../components/ProgressBoxes";
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskDto } from "../../../models/Dtos/Tasks/TaskDto";
import { toast } from "react-toastify";
import { FinishDialog } from "../../../components/FinishDialog";

type AnswersHistory = {
  taskIndex: number;
  answer: string;
  isFixed: boolean;
}

export function DecidePage() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<AnswersHistory[]>([]);
  const [notFixedAnswersNumbers, setNotFixedAnswersNumbers] = useState<number[]>([]);
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const tasks: TaskDto[] = location.state?.tasksData;

  const handleAnswerClick = (answer: string) => {
    setAnswersHistory(prev => {
      const answerHistoryIndex = prev.findIndex(a => a.taskIndex === currentTaskIndex);

      if (answerHistoryIndex !== -1) {
        return prev.map((item, idx) => 
          idx === answerHistoryIndex ? { ...item, isFixed: item.answer === answer, answer: answer } : item
        );
      }

      return [...prev, { taskIndex: currentTaskIndex, answer: answer, isFixed: false }];
    });

    setSelectedAnswer(answer);
  };

  const handleChoosingTask = (index: number) => {
    if (index >= tasks.length)
      return;

    console.log(answersHistory)

    const savedAnswer = answersHistory.find(a => a.taskIndex === index);

    if (savedAnswer)
      setSelectedAnswer(savedAnswer.answer);

    setCurrentTaskIndex(index);
  }

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1)
      setCurrentTaskIndex(currentTaskIndex + 1);
  }

  const handleFixingTheAnswer = () => {
      setAnswersHistory(prev => 
        prev.map(item => 
          item.taskIndex === currentTaskIndex ? { ...item, isFixed: true } : item
      )
    );
  }

  const handleFinish = () => {
    const notFixedAnswersNumbers = answersHistory
      .map((a, index) => a.isFixed == false ? index + 1 : null)
      .filter(index => index !== null)

    setNotFixedAnswersNumbers(notFixedAnswersNumbers);

    if (notFixedAnswersNumbers.length > 0) {
      toast.warning("Имеются несохраненные ответы!");

      return;
    }

    setIsFinishDialogOpen(true);
  }

  const handleCancel = () => {
    navigate("/tests");
  }

  function getNextButtonVisibility() {
    return currentTaskIndex < tasks.length - 1 ? "visible" : "hidden";
  }

  return (
    <Box sx={{
      display: 'flex',
      '@media (max-width: 900px)': {
          flexDirection: 'column',
          width: 'calc(100% - 40px)'
      },
    }}>
        <FinishDialog open={isFinishDialogOpen} onClose={() => {}} onConfirm={() => {}} />

        <ProgressBoxes totalQuestions={tasks.length} errorBoxes={notFixedAnswersNumbers} onChoose={handleChoosingTask}></ProgressBoxes>

        <Box component="section" sx={{ 
          borderRadius: 3, 
          bgcolor: "#616161",
          margin: "20px",
          width: '100%', 
          display: 'flex',      
          flexDirection: 'column'
        }}> 
          <Typography 
            variant="h3" 
            sx={{
            marginTop: "20px",
            borderBottom: '1px solid #444',
            paddingBottom: 2,
            width: '100%',
            textAlign: 'center',
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}>
            {tasks[currentTaskIndex].taskName}
          </Typography>

          <Card sx={{ 
            maxWidth: 600,
            margin: '10px auto',
            width: "calc(100% - 20px)"
          }}>
            <CardMedia component="img" height="140" image="https://pic.rutubelist.ru/playlist/bf544654-e5e5-11ef-b595-02420a00066a.jpg" alt="image" />
          </Card>

          <Typography 
            variant="h5" 
            sx={{
            marginTop: "20px",
            flex: 1,
            textAlign: 'center',
            wordBreak: 'break-all',
          }}>
            {tasks[currentTaskIndex].taskMessage}
          </Typography>
          
          {tasks[currentTaskIndex].answers && tasks[currentTaskIndex].answers.length > 0
          ? 
          <Box
            sx={{
              gap: 1,
              margin: "20px",
              width: "calc(100% - 40px)",
              display: "flex",
            }}
          >
            {tasks[currentTaskIndex].answers.map((answer) => (
              <Button
                variant="contained" 
                color={selectedAnswer === answer ? 'primary' : 'inherit'}
                onClick={() => handleAnswerClick(answer)}
                sx={{
                  backgroundColor: selectedAnswer === answer ? null : 'white',
                  color: selectedAnswer === answer ? 'white' : 'black',
                  '&:hover': {
                    backgroundColor: selectedAnswer === answer ? null : '#f5f5f5',
                  },
                  width: "100%",
                  wordBreak: 'break-all',
                }}
              >
                {answer}
              </Button>
            ))}
          </Box>
          : 
          <TextField id="outlined-basic" label="Ваш ответ" variant="outlined" style={{width: "calc(100% - 40px)", marginTop: "20px", marginLeft: "20px"}} />}

          <Box
            sx={{
              gap: 3,
              margin: "20px",
              width: "calc(100% - 40px)",
              display: "flex",
            }}
          >
              <Button
                variant="contained" 
                color="primary"
                disabled = {answersHistory.find(a => a.taskIndex === currentTaskIndex)?.isFixed}
                onClick={handleFixingTheAnswer}
                sx={{
                  width: "100%",
                  wordBreak: 'break-all',
                }}
              >
                Сохранить ответ
              </Button>

              <Button
                variant="contained" 
                color="success"
                onClick={handleNext}
                sx={{
                  width: "100%",
                  wordBreak: 'break-all',
                  color: "white",
                  visibility: getNextButtonVisibility()
                }}
              >
                Далее
              </Button>
          </Box>
        </Box>

        <Box component="section" sx={{ 
          p: 1,
          borderRadius: 3, 
          minWidth: "320px",
          maxWidth: "360px",
          bgcolor: "#555555",
          marginTop: "20px",
          height: '86vh',
          display: 'flex',
          flexDirection: "column",
          '@media (max-width: 900px)': {
              width: '100%',
              margin: "20px",
              maxWidth: '900px',
              height: "120px",
              overflowY: "auto",
          },
        }}> 

          <div style={{display: "flex", width: "100%"}}>
            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Button variant="contained" color="success" onClick={handleFinish} sx={{width: "145px", color: 'white'}} startIcon={<PlayArrowIcon />}>Завершить</Button>
              <Button variant="contained" color="error" sx={{width: "145px", marginTop: "20px"}} startIcon={<ClearIcon />}>Выйти</Button>
              <Button variant="contained" color="primary" sx={{width: "145px", marginTop: "20px", color: "white"}} startIcon={<ChangeCircleIcon />}>Сменить режим</Button>
            </div>

            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Button variant="contained" color="error" onClick={handleCancel} sx={{width: "145px", color: 'white'}} startIcon={<ClearIcon />}>Выйти</Button>
              <Button variant="contained" color="warning" sx={{width: "145px", marginTop: "20px", color: "white"}} startIcon={<AnalyticsIcon />}>Аналитика</Button>
              <Button  variant="outlined" startIcon={<BuildIcon />} sx={{width: "145px", marginTop: "20px"}}>Изменить задачи</Button>
            </div>
          </div>

          <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "20px"}}>
            <FormControlLabel control={<Checkbox checked={true} />} label="Анимация при неверном ответе"/>
            <FormControlLabel control={<Checkbox checked={true} />} label="Показывать ответ после решения"/>
            <FormControlLabel control={<Checkbox checked={true} />} label="Скрывать варианты ответа"/>
          </div>
        </Box>
    </Box>)
}