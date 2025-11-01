import { Box, Button, Card, CardMedia, Link, Typography } from "@mui/material";
import image from '../../assets/image.png';
import image2 from '../../assets/image2.png';
import video from "../../assets/video.mp4"
import video2 from "../../assets/video2.mp4";
import video3 from "../../assets/video3.mp4";
import video4 from "../../assets/video4.mp4";
import video5 from "../../assets/video5.mp4";
import { OptimizedVideoPlayer } from "../../shared/helpers/OptimizedVideoPlayer";
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VkIcon from '@mui/icons-material/ContactSupport';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
  })

  return (
    <div style={{margin: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 15}}>
      <Typography 
        variant="h2" 
        textAlign={"center"}
        sx={{width: "100%", display: "flex", justifyContent: "center"}}>
          Удобная платформа для проверки знаний!
      </Typography>

      <Typography 
        variant="h5"
        textAlign={"center"}
        sx={{width: "83%", display: "flex", justifyContent: "center", color: "lightgray"}}>
          Хотите проверить знания в определённой сфере себя или кого - то ещё? Сервис по генерации викторин на базе AI отлично справится с этой задачей!
      </Typography>

      <div style={{display: "flex", gap: 10}}>
        <Button onClick={() => navigate("/tests")} variant="contained">Попробовать бесплатно</Button>
        <Button variant="outlined">Смотреть обзор</Button>
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

      <Box sx={{width: "99vw", height: "100%", backgroundColor: "#06545b", margin: 0, marginTop: "-20px", padding: "80px"}}>
        <Typography 
          variant="h5"
          sx={{width: "83%", display: "flex", color: "lightgray"}}>
            Для преподавателей
        </Typography>

        <Typography 
          variant="h3"
          sx={{width: "100%", display: "flex"}}>
            Просматривайте прогресс учеников
        </Typography>

        <Typography 
          variant="h6"
          sx={{width: "83%", display: "flex"}}>
            Удобные фильтры позволяют увидеть нужные результаты участников викторин
        </Typography>

        <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
          <Box sx={{backgroundColor: "#033b40", padding: 5, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(0, 184, 212, 0.6)'}}>
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
          sx={{width: "100%", display: "flex", marginTop: "200px"}}>
            Делитесь ссылками на викторины
        </Typography>

        <Typography 
          variant="h6"
          sx={{width: "83%", display: "flex"}}>
            Копируйте ссылки на викторины одной кнопкой мыши и делитесь ими со всеми желающими!
        </Typography>

        <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
          <Box sx={{backgroundColor: "#033b40", padding: 5, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(0, 184, 212, 0.6)'}}>
            <OptimizedVideoPlayer
              videoSrc={video}
            />
          </Box>
        </div>

        <Typography 
          variant="h3"
          sx={{width: "100%", display: "flex", marginTop: "200px"}}>
            Создание с помощью ИИ
        </Typography>

        <Typography 
          variant="h6"
          sx={{width: "83%", display: "flex"}}>
            ИИ сможет помочь вам в создании викторины по любой теме, вы в свою очередь без проблем сможете отредактировать созданное
        </Typography>

        <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
          <Box sx={{backgroundColor: "#033b40", padding: 5, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(0, 184, 212, 0.6)'}}>
            <OptimizedVideoPlayer
              videoSrc={video2}
            />
          </Box>
        </div>
      </Box>

      <Box sx={{width: "99vw", height: "100%", backgroundColor: "#0a5723", margin: 0, marginTop: "-20px", padding: "80px"}}>
          <Typography 
            variant="h5"
            sx={{width: "83%", display: "flex", color: "lightgray"}}>
              Для учеников
          </Typography>

          <Typography 
            variant="h3"
            sx={{width: "100%", display: "flex"}}>
              Режим "интервальных повторений"
          </Typography>

          <Typography 
            variant="h6"
            sx={{width: "83%", display: "flex"}}>
              Решайте задачи до тех пор, пока квадратики полностью не заполнятся зелёным!
          </Typography>

          <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
            <Box sx={{backgroundColor: "#054319", padding: 5, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(12, 202, 77, 0.6)'}}>
              <OptimizedVideoPlayer
                videoSrc={video3}
              />
            </Box>
          </div>

          <Typography 
            variant="h3"
            sx={{width: "100%", display: "flex", marginTop: "200px"}}>
              Понравившиеся викторины
          </Typography>

          <Typography 
            variant="h6"
            sx={{width: "83%", display: "flex"}}>
              Вы можете сохранять викторины, которые вам понравились!
          </Typography>

          <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
            <Box sx={{backgroundColor: "#054319", padding: 5, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(12, 202, 77, 0.6)'}}>
              <OptimizedVideoPlayer
                videoSrc={video4}
              />
            </Box>
          </div>

          <Typography 
            variant="h3"
            sx={{width: "100%", display: "flex", marginTop: "200px"}}>
              Анализ ошибок с помощью AI
          </Typography>

          <Typography 
            variant="h6"
            sx={{width: "83%", display: "flex"}}>
              AI проанализирует ваши ошибки и объяснит правильный ответ!
          </Typography>

          <div style={{width: "100%", justifyContent: "center", display: "flex", marginTop: "80px"}}>
            <Box sx={{backgroundColor: "#054319", padding: 5, borderRadius: 4, boxShadow: '0 0 20px 5px rgba(12, 202, 77, 0.6)'}}>
              <OptimizedVideoPlayer
                videoSrc={video5}
              />
            </Box>
          </div>
      </Box>

      <Typography 
        variant="h3" 
        textAlign={"center"}
        sx={{width: "100%", display: "flex", justifyContent: "center"}}>
          Следи за новостями на официальных источниках!
      </Typography>

      <div style={{display: "flex", gap: 50}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TelegramIcon color="primary" fontSize="large" />
          <Link 
            href="https://t.me/yourofficialchannel" 
            target="_blank"
            rel="noopener noreferrer"
            variant="h5"
          >
            Официальный Telegram-канал SynapzeAI
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VkIcon color="primary" fontSize="large" />
          <Link 
            href="https://t.me/yourofficialchannel" 
            target="_blank"
            rel="noopener noreferrer"
            variant="h5"
          >
           Наша Страница в ВК
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <YouTubeIcon color="primary" fontSize="large" />
          <Link 
            href="https://t.me/yourofficialchannel" 
            target="_blank"
            rel="noopener noreferrer"
            variant="h5"
          >
           YouTube канал разработчика
          </Link>
        </Box>
      </div>

      <div style={{height: "160px"}}></div>
    </div>
  )
}