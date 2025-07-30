import { Box, Button, Card, CardMedia, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BuildIcon from '@mui/icons-material/Build';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ProgressBoxes from "../../../components/ProgressBoxes";
import ClearIcon from '@mui/icons-material/Clear';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskStatisticDto } from "../../../models/Dtos/Tasks/TaskStatisticDto";
import { StatisticTask } from "../../../models/Tasks/StatisticTask";
import { TestDto } from "../../../models/Dtos/Tests/TestDto";
import { motion } from "framer-motion";

function calculatePriorityNumber(taskStatistic?: TaskStatisticDto): number {
    if (!taskStatistic) {
        return 1000;
    }

    const now = new Date();

    const errorAvr = taskStatistic.errorsCount / (taskStatistic.errorsCount + taskStatistic.rightAnswersCount + 0.01)
    const tryFactor = 1 / (Math.sqrt(taskStatistic.errorsCount + taskStatistic.rightAnswersCount) + 0.01)
    const lastReviewFactor = Math.log10((now.getTime() - taskStatistic.lastReviewTime.getTime()) / 84400 + 1)

    const priority = (
        0.5 * errorAvr +
        0.7 * tryFactor +
        0.6 * lastReviewFactor
    );

    return Math.max(0, Math.min(1, priority));
}

export function DecideWithIntervalPage() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [priorityTasks, setPriorityTasks] = useState<StatisticTask[]>([]);

  const [isHideAnswers, setIsHideAnswers] = useState<boolean>(false);

  const [isWrongAnswerAnimation, setIsWrongAnswerAnimation] = useState<boolean>(false);
  const [isWrongAnswerAnimationActive, setIsWrongAnswerAnimationActive] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  const test: TestDto = location.state?.testData;

  const wrongAnswerAnimationDuration = 0.8;

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    const isRightAnswer = selectedAnswer.toLowerCase() === test.tasks[currentTaskIndex].rightAnswer?.toLowerCase();

    if (isWrongAnswerAnimationActive && isRightAnswer === false) {
      setIsWrongAnswerAnimation(true)

      await new Promise(resolve => setTimeout(resolve, wrongAnswerAnimationDuration + 1000));

      setIsWrongAnswerAnimation(false);
    }

    setSelectedAnswer("");

    const taskStatistic: TaskStatisticDto = priorityTasks[currentTaskIndex].taskStatistic;

    const newTaskStatistic: TaskStatisticDto = 
    { 
        rightAnswersCount: taskStatistic.rightAnswersCount + (isRightAnswer ? 1 : 0),
        errorsCount: taskStatistic.errorsCount + (isRightAnswer ? 0 : 1),
        avgTimeSolvingSec: 0,
        lastReviewTime: new Date()
    } as TaskStatisticDto

    setPriorityTasks(prev => {
      const priorityTaskIndex = prev.findIndex(a => a.taskIndex === currentTaskIndex);

      if (priorityTaskIndex !== -1) {
        return prev.map((item, idx) => 
          idx === priorityTaskIndex 
            ? { ...item, priorityNumber: calculatePriorityNumber(newTaskStatistic), taskStatistic: newTaskStatistic } as StatisticTask
            : { ...item, priorityNumber: calculatePriorityNumber(item.taskStatistic) } as StatisticTask
        );
      }

      return [...prev];
    });
  }

  const handleFinish = () => {
    const statisticTasksData = priorityTasks;
    const testData = test;

    navigate("/tests/verdictInterval", { state: { statisticTasksData, testData } })
  }

  const handleCancel = () => {
    navigate("/tests");
  }

  const getHighestPriorityTaskIndex = (priorTasks: StatisticTask[]): number | null => {
    if (priorTasks.length === 0 || test.tasks.length === 0) 
        return null;
    
    const highestPriority = priorTasks.reduce((prev, current) => 
        (prev.priorityNumber > current.priorityNumber) ? prev : current
    );
    
    return highestPriority.taskIndex;
  };

  const handleUpdateTest = () => {
    const testData = test;
    navigate("/tests/update", { state: { testData } })
  }

  const handleShowSolvingHistories = () => {
    const testIdData = test.id;
    navigate("/tests/solvingHistories", { state: { testIdData } })
  }

  const handleReset = () => {
    setPriorityTasks([]);
    setCurrentTaskIndex(0);
    setSelectedAnswer("");
  }

  const handleChangeMode = () => {
      const testData = test;
      navigate("/tests/decide", { state: { testData } })
  };

  function getAnswerButtonColor(answer: string) {
    if (isWrongAnswerAnimation) {
      if (answer === test.tasks[currentTaskIndex].rightAnswer) {
        return 'success'
      }
      else if (selectedAnswer === answer)
        return 'error'

      return 'inherit'
    }
      
    return selectedAnswer === answer ? 'primary' : 'inherit'
  }

  useEffect(() => {
    if (priorityTasks.length < 1) {
        const initialPriorityTasks: StatisticTask[] = test.tasks.map((task, index) => ({
            taskIndex: index,
            priorityNumber: calculatePriorityNumber(task.taskStatistic),
            taskStatistic: task.taskStatistic ?? {rightAnswersCount: 0, errorsCount: 0, avgTimeSolvingSec: 0, lastReviewTime: new Date()} as TaskStatisticDto,
        }));

        setPriorityTasks(initialPriorityTasks);
    }
    else {
        setCurrentTaskIndex(getHighestPriorityTaskIndex(priorityTasks) ?? 0)
    }

  }, [priorityTasks]);

  return (
    <Box sx={{
      display: 'flex',
      '@media (max-width: 900px)': {
          flexDirection: 'column',
          width: 'calc(100% - 40px)'
      },
    }}>
        <ProgressBoxes totalQuestions={test.tasks.length} progressValues={priorityTasks.map(p => 1 - p.priorityNumber)}></ProgressBoxes>

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
                          <motion.div
                            animate={isWrongAnswerAnimation && answer === selectedAnswer
                              ? { x: [-5, 5, -5, 5, 0] } 
                              : {}}
                            transition={{ duration: wrongAnswerAnimationDuration }}
                            style={{ width: '100%' }}
                          >
                              <Button
                                  variant="contained" 
                                  color={getAnswerButtonColor(answer)}
                                  onClick={() => handleAnswerChange(answer)}
                                  sx={{
                                      color: 'white',
                                      width: "100%",
                                      wordBreak: 'break-all',
                                  }}
                                  >
                                  {answer}
                              </Button>
                          </motion.div>
                        ))}
                </Box>
                : 
                <TextField 
                    id="outlined-basic" 
                    onChange={(e) => handleAnswerChange(e.target.value)} 
                    value={selectedAnswer}
                    label="Ваш ответ" 
                    variant="outlined" 
                    style={{width: "calc(100% - 40px)", marginTop: "20px", marginLeft: "20px"}} 
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
                    color="success"
                    onClick={handleNext}
                    sx={{
                    width: "100%",
                    wordBreak: 'break-all',
                    color: "white"
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
              <Button variant="contained" color="inherit" onClick={handleReset} sx={{width: "145px", marginTop: "20px"}} startIcon={<RestartAltIcon />}>Сброс</Button>
              <Button variant="contained" color="primary" onClick={handleChangeMode} sx={{width: "145px", marginTop: "20px", color: "white"}} startIcon={<ChangeCircleIcon />}>Сменить режим</Button>
            </div>

            <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Button variant="contained" color="error" onClick={handleCancel} sx={{width: "145px", color: 'white'}} startIcon={<ClearIcon />}>Выйти</Button>
              <Button variant="contained" onClick={handleShowSolvingHistories} color="warning" sx={{width: "145px", marginTop: "20px", color: "white"}} startIcon={<AnalyticsIcon />}>История</Button>
              <Button  variant="outlined" onClick={handleUpdateTest} startIcon={<BuildIcon />} sx={{width: "145px", marginTop: "20px"}}>Изменить задачи</Button>
            </div>
          </div>

          <div style={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "20px"}}>
            <FormControlLabel control={<Checkbox checked={isWrongAnswerAnimationActive} onChange={(e) => setIsWrongAnswerAnimationActive(e.target.checked)} />} label="Показывать ответ после решения"/>
            <FormControlLabel control={<Checkbox checked={isHideAnswers} onChange={(e) => setIsHideAnswers(e.target.checked)} />} label="Скрывать варианты ответа"/>
          </div>
        </Box>
    </Box>)
}