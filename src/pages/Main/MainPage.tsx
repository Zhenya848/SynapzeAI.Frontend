import { Box, Button, Card, CardMedia, colors, Typography } from "@mui/material";
import image from '../../assets/image.png';
import image2 from '../../assets/image2.png';

export function MainPage() {
  return (
    <div style={{margin: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 15}}>
      <Typography 
        variant="h2" 
        textAlign={"center"}
        sx={{width: "100%", display: "flex", justifyContent: "center"}}>
          Удобная платформа для проверки любых знаний!
      </Typography>

      <Typography 
        variant="h5"
        textAlign={"center"}
        sx={{width: "83%", display: "flex", justifyContent: "center", color: "lightgray"}}>
          Хотите проверить знания в определённой сфере себя или кого - то ещё? Сервис по генерации викторин на базе AI отлично справится с этой задачей!
      </Typography>

      <div style={{display: "flex", gap: 10}}>
        <Button variant="contained">Попробовать бесплатно</Button>
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
            Удобные фильтры позволяют увидеть нужные результаты участников викторины
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
            Скопируйте ссылку на викторину одной кнопкой мыши и разошлите её всем желающим!
        </Typography>
      </Box>
    </div>
  )
}