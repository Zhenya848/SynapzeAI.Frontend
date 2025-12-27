import { Box, Button, Card, CardMedia, Link, Typography } from "@mui/material";
import image from '../../assets/images/image.png';
import image2 from '../../assets/images/image2.png';
import video from "../../assets/videos/video.mp4"
import video2 from "../../assets/videos/video2.mp4";
import video3 from "../../assets/videos/video3.mp4";
import video4 from "../../assets/videos/video4.mp4";
import video5 from "../../assets/videos/video5.mp4";
import { OptimizedVideoPlayer } from "../../shared/helpers/OptimizedVideoPlayer";
import TelegramIcon from '@mui/icons-material/Telegram';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useScreenSize } from "../../shared/helpers/useScreenSize";
import { useSetUser } from "../../shared/helpers/api/useSetUser";

export function MainPage() {
  const isMobile = useScreenSize();
  const setUser = useSetUser();
  const navigate = useNavigate();

  useEffect(() => {
    setUser();
  }, []);

  return (
    <div style={{margin: "8px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 15}}>
      <Typography
        textAlign={"center"}
        sx={{display: "flex", justifyContent: "center", maxWidth: '100%', fontSize: { xs: "28px", lg: "3.6rem" }}}>
          Удобная платформа для проверки знаний!
      </Typography>

      <Typography 
        textAlign={"center"}
        sx={{width: "83%", display: "flex", justifyContent: "center", color: "lightgray", fontSize: { xs: "16px", lg: "1.5rem" }}}>
          Хотите проверить знания в определённой сфере себя или кого - то ещё? Сервис по генерации викторин на базе AI отлично справится с этой задачей!
      </Typography>

      <div style={{display: "flex", gap: 10}}>
        <Button onClick={() => navigate("/tests")} variant="contained">Попробовать бесплатно</Button>
        <Button onClick={() => navigate("/register")} variant="outlined">Регистрация</Button>
      </div>

      <div style={{marginTop: "100px"}}>
        <Card sx={{
          maxWidth: 1400,
          width: "100%",
          boxShadow: '0 0 20px 5px rgba(0, 184, 212, 0.6)',
          '&:hover': {
            boxShadow: '0 0 30px 10px rgba(0, 184, 212, 0.8)',
          },
          borderRadius: 4
        }}>
          <CardMedia component="img" height="800" image={image} alt="image" />
        </Card>
      </div>

      <Box sx={{width: "99vw", height: "100%", backgroundColor: "#06545b", margin: 0, marginTop: "-20px", padding: isMobile ? "16px" : "80px"}}>
        <Typography 
          variant="h5"
          sx={{width: "83%", display: "flex", color: "lightgray", fontSize: { xs: "16px", lg: "1.5rem" }}}>
            Для преподавателей
        </Typography>

        <Typography 
          variant="h3"
          sx={{width: "100%", display: "flex", fontSize: { xs: "25px", lg: "3rem" }}}>
            Просматривайте прогресс учеников
        </Typography>

        <Typography 
          variant="h6"
          sx={{width: "83%", display: "flex", fontSize: { xs: "12px", lg: "1.2rem" }}}>
            Удобные фильтры позволяют увидеть нужные результаты участников викторин
        </Typography>

        <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
          <Box sx={{backgroundColor: "#033b40", padding: isMobile ? 0.5 : 3, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(0, 184, 212, 0.6)'}}>
            <Card sx={{
              maxWidth: 1400,
              width: "100%", 
              borderRadius: 4
            }}>
              <CardMedia component="img" height="800" image={image2} alt="image" />
            </Card>
          </Box>
        </div>

        <Typography 
          variant="h3"
          sx={{width: "100%", display: "flex", marginTop: "200px", fontSize: { xs: "28px", lg: "3.6rem" }}}>
            Делитесь ссылками на викторины
        </Typography>

        <Typography 
          variant="h6"
          sx={{width: "83%", display: "flex", fontSize: { xs: "12px", lg: "1.2rem" }}}>
            Копируйте ссылки на викторины одной кнопкой мыши и делитесь ими со всеми желающими!
        </Typography>

        <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
          <Box sx={{backgroundColor: "#033b40", padding: isMobile ? 0.5 : 3, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(0, 184, 212, 0.6)'}}>
            <OptimizedVideoPlayer
              videoSrc={video}
            />
          </Box>
        </div>

        <Typography 
          variant="h3"
          sx={{width: "100%", display: "flex", marginTop: "200px", fontSize: { xs: "25px", lg: "3rem" }}}>
            Создание с помощью ИИ
        </Typography>

        <Typography 
          variant="h6"
          sx={{width: "83%", display: "flex", fontSize: { xs: "12px", lg: "1.2rem" }}}>
            ИИ сможет помочь вам в создании викторины по любой теме, вы в свою очередь без проблем сможете отредактировать созданное
        </Typography>

        <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
          <Box sx={{backgroundColor: "#033b40", padding: isMobile ? 0.5 : 3, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(0, 184, 212, 0.6)'}}>
            <OptimizedVideoPlayer
              videoSrc={video2}
            />
          </Box>
        </div>
      </Box>

      <Box sx={{width: "99vw", height: "100%", backgroundColor: "#0a5723", margin: 0, marginTop: "-20px", padding: isMobile ? "16px" : "80px"}}>
          <Typography 
            variant="h5"
            sx={{width: "83%", display: "flex", color: "lightgray", fontSize: { xs: "16px", lg: "1.5rem" }}}>
              Для учеников
          </Typography>

          <Typography 
            variant="h3"
            sx={{width: "100%", display: "flex", fontSize: { xs: "25px", lg: "3rem" }}}>
              Анализ ошибок с помощью AI
          </Typography>

          <Typography 
            variant="h6"
            sx={{width: "83%", display: "flex", fontSize: { xs: "12px", lg: "1.2rem" }}}>
              AI проанализирует ваши ошибки и объяснит правильный ответ!
          </Typography>

          <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
            <Box sx={{backgroundColor: "#054319", padding: isMobile ? 0.5 : 3, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(12, 202, 77, 0.6)'}}>
              <OptimizedVideoPlayer
                videoSrc={video5}
              />
            </Box>
          </div>

          <Typography 
            variant="h3"
            sx={{width: "100%", display: "flex", marginTop: "200px", fontSize: { xs: "25px", lg: "3rem" }}}>
              Режим "интервальных повторений"
          </Typography>

          <Typography 
            variant="h6"
            sx={{width: "83%", display: "flex", fontSize: { xs: "12px", lg: "1.2rem" }}}>
              Решайте задачи до тех пор, пока не запмоните всё!
          </Typography>

          <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
            <Box sx={{backgroundColor: "#054319", padding: isMobile ? 0.5 : 3, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(12, 202, 77, 0.6)'}}>
              <OptimizedVideoPlayer
                videoSrc={video3}
              />
            </Box>
          </div>

          <Typography 
            variant="h3"
            sx={{width: "100%", display: "flex", marginTop: "200px", fontSize: { xs: "25px", lg: "3rem" }}}>
              Понравившиеся викторины
          </Typography>

          <Typography 
            variant="h6"
            sx={{width: "83%", display: "flex", fontSize: { xs: "12px", lg: "1.2rem" }}}>
              Вы можете сохранять викторины, которые вам понравились!
          </Typography>

          <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
            <Box sx={{backgroundColor: "#054319", padding: isMobile ? 0.5 : 3, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(12, 202, 77, 0.6)'}}>
              <OptimizedVideoPlayer
                videoSrc={video4}
              />
            </Box>
          </div>
      </Box>

      <Typography 
        variant="h3" 
        textAlign={"center"}
        sx={{width: "100%", display: "flex", justifyContent: "center", fontSize: { xs: "25px", lg: "3rem" }}}>
          Соцсети
      </Typography>

      <div style={{display: "flex", flexWrap: "wrap", gap: isMobile ? 20 : 50, justifyContent: "center"}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TelegramIcon color="primary" fontSize="large" />
          <Link 
            href="https://t.me/EvgenijBe" 
            target="_blank"
            rel="noopener noreferrer"
            variant={isMobile ? "h6" : "h5"}
          >
            Написать в ЛС
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TelegramIcon color="primary" fontSize="large" />
          <Link 
            href="https://t.me/+UewO81O-GeJmZGVi" 
            target="_blank"
            rel="noopener noreferrer"
            variant={isMobile ? "h6" : "h5"}
          >
            канал разработчика
          </Link>
        </Box>
      </div>

      <div style={{height: "160px"}}></div>
    </div>
  )
}