import { Box, Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BuildIcon from '@mui/icons-material/Build';
import ProgressBoxes from "../../../widgets/ProgressBoxes";
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PauseIcon from '@mui/icons-material/Pause';
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AnswersHistory } from "../../../features/tasks/model/AswerHistory";
import { Test } from "../../../entities/test/Test";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { CountdownTimer } from "../../../entities/task/components/Timer/CountdownTimer";
import { CountdownTimerHandle } from "../../../entities/task/components/Timer/CountdownTimerHandle";
import { PauseDialog } from "../../../entities/task/components/Timer/PauseDialog";
import { useGetTestMutation } from "../../../features/tests/api";
import { useSetUser } from "../../../shared/helpers/api/useSetUser";

export function DecidePage() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answersHistory, setAnswersHistory] = useState<AnswersHistory[]>([]);
  const [notFixedAnswersIndexes, setNotFixedAnswersIndexes] = useState<number[]>([]);

  const [isHideAnswers, setIsHideAnswers] = useState<boolean>(false);

  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState<boolean>(false);

  const timerRef = useRef<CountdownTimerHandle>(null);

  const { testId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const testData: Test = location.state?.testData;

  const [test, setTest] = useState<Test>();

  const [getTest, {isLoading}] = useGetTestMutation();

  const setUser = useSetUser();

  useEffect(() => {
    const fetchData = async () => {
      if (testId) {
        try {
          const response = await getTest({ testId: testId }).unwrap();

          setTest(response.result!);
        }
        catch (error: any) {
          error.data.responseErrors.forEach((e: { message: string }) => {
              toast.error(e.message);
          });
        }
      }
      else {
        if (!testData) {
          navigate("/tests");
          return;
        }

        setTest(testData);
      }
    };

    fetchData();
  }, [getTest, navigate, testData, testId])

  useEffect(() => {
    setUser();
  }, []);

  if (isLoading || !test) {
    return (
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 1}}>
        <CircularProgress variant="indeterminate" />
        <Typography variant="h4" color="primary">Загрузка...</Typography>
      </Box>
    )
  }

  if (test.tasks.length === 0) {
    toast.error("Викторина не содержит задач для решения!");
    navigate("/tests");

    return;
  }

  const handleAnswerChange = (answer: string) => {
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
    if (index >= test.tasks.length)
      return;

    const savedAnswer = answersHistory.find(a => a.taskIndex === index);

    setSelectedAnswer(savedAnswer ? savedAnswer.answer : "");
    setCurrentTaskIndex(index);
  }

  const handleNext = () => {
    if (currentTaskIndex < test.tasks.length - 1)
      setCurrentTaskIndex(currentTaskIndex + 1);

    const savedAnswer = answersHistory.find(a => a.taskIndex === currentTaskIndex + 1);
    setSelectedAnswer(savedAnswer ? savedAnswer.answer : "");
  }

  const handleFixingTheAnswer = () => {
      setAnswersHistory(prev => 
        prev.map(item => 
          item.taskIndex === currentTaskIndex ? { ...item, isFixed: true } : item
      )
    );
  }

  const navigateToVerdictPage = () => {
    const testData = test;
    const answerHistoryData = answersHistory;
    const expiredTimeData = timerRef.current?.getExpiredTime() ?? 0;

    navigate("/tests/verdict", { state: { answerHistoryData, testData, expiredTimeData } })
  }

  const handleFinish = () => {
    const notFixedAnswersIndexes = answersHistory
      .map((a, index) => a.isFixed == false ? a.taskIndex : null)
      .filter(index => index !== null)

    console.log(notFixedAnswersIndexes)

    setNotFixedAnswersIndexes(notFixedAnswersIndexes);

    if (notFixedAnswersIndexes.length > 0) {
      toast.warning("Имеются несохраненные ответы!");

      return;
    }

    navigateToVerdictPage();
  }

  const handleCancel = () => {
    navigate("/tests");
  }

  const handleUpdateTest = () => {
    const testData = test;
    navigate("/tests/update", { state: { testData } })
  }

  const handlePause = () => {
    timerRef.current?.pause();
    setIsPauseDialogOpen(true);
  }

  const handleStartAgain = () => {
    setAnswersHistory([]);
    setNotFixedAnswersIndexes([]);
    setCurrentTaskIndex(0);
    setSelectedAnswer("");

    timerRef.current?.reset();
    timerRef.current?.start();
  }

  const handleChangeMode = () => {
      const testData = test;
      navigate("/tests/decideWithInterval", { state: { testData } })
  };

  const handlePauseDialogClose = () => {
    setIsPauseDialogOpen(false);
    timerRef.current?.start();
  }

  function getNextButtonVisibility() {
    return currentTaskIndex < test.tasks.length - 1 ? "visible" : "hidden";
  }

  return (
    <Box sx={{
      display: 'flex',
      '@media (max-width: 900px)': {
          flexDirection: 'column',
          width: 'calc(100% - 40px)'
      },
    }}>
        <ProgressBoxes 
          totalQuestions={test.tasks.length} 
          errorBoxes={notFixedAnswersIndexes} 
          onChoose={handleChoosingTask}
          currentIndex={currentTaskIndex}>
        </ProgressBoxes>

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
              {test.tasks[currentTaskIndex].taskName}
            </Typography>

            <Typography 
              variant="h5" 
              sx={{
              marginTop: "20px",
              flex: 1,
              textAlign: 'center',
              wordBreak: 'break-all',
            }}>
              {test.tasks[currentTaskIndex].taskMessage}
            </Typography>
          
            {test.tasks[currentTaskIndex].answers && test.tasks[currentTaskIndex].answers.length > 0 && isHideAnswers === false
              ? 
              <Box
                sx={{
                  gap: 1,
                  margin: "20px",
                  width: "calc(100% - 40px)",
                  display: "flex",
                }}
              >
                {test.tasks[currentTaskIndex].answers.map((answer) => (
                  <Button
                    variant="contained" 
                    color={selectedAnswer === answer ? 'primary' : 'inherit'}
                    onClick={() => handleAnswerChange(answer)}
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
              <TextField 
                id="outlined-basic" 
                onChange={(e) => handleAnswerChange(e.target.value)} 
                value={selectedAnswer}
                label="Ваш ответ" 
                variant="outlined" 
                style={{width: "calc(100% - 40px)", 
                marginTop: "20px", 
                marginLeft: "20px"}} 
              />
            }

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
              height: "350px",
              overflowY: "auto",
          },
        }}> 

          <div style={{display: "flex", width: "100%"}}>
            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Button variant="contained" color="success" onClick={handleFinish} sx={{width: "145px", color: 'white'}} startIcon={<PlayArrowIcon />}>Завершить</Button>
              <Button variant="contained" color="inherit" onClick={handleStartAgain} sx={{width: "145px", marginTop: "20px"}} startIcon={<RestartAltIcon />}>Заново</Button>
              <Button variant="contained" color="primary" onClick={handleChangeMode} sx={{width: "145px", marginTop: "20px", color: "white"}} startIcon={<ChangeCircleIcon />}>Сменить режим</Button>
            </div>

            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Button variant="contained" color="error" onClick={handleCancel} sx={{width: "145px", color: 'white'}} startIcon={<ClearIcon />}>Выйти</Button>
              <Button variant="contained" onClick={handlePause} color="warning"sx={{width: "145px", marginTop: "20px", color: "white"}} startIcon={<PauseIcon />}>Пауза</Button>
              <Button  variant="outlined" onClick={handleUpdateTest} startIcon={<BuildIcon />} sx={{width: "145px", marginTop: "20px"}}>Изменить задачи</Button>
            </div>
          </div>

          <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "20px"}}>
            <FormControlLabel control={<Checkbox checked={isHideAnswers} onChange={(e) => setIsHideAnswers(e.target.checked)} />} label="Скрывать варианты ответа"/>
          </div>

          <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'flex-end'}}>
            <CountdownTimer seconds={test.limitTime?.seconds ?? 0} minutes={test.limitTime?.minutes ?? 999} ref={timerRef} onTimeOut={navigateToVerdictPage}></CountdownTimer>
          </div>
        </Box>

        <PauseDialog open={isPauseDialogOpen} onClose={handlePauseDialogClose}></PauseDialog>
    </Box>)
}