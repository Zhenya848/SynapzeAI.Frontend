import { Avatar, Button, Typography } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ImageWithTextCard } from "../../components/ImageWithTextCard";

export function AccountPage() {
    const fullName = "Аккакий Аккакиев Драздрапермович";
    const description = "ААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА";

    const years = 5;
    const countOfAnimals = 8;

    const phoneNumber = "+79773105950";
    const email = "BelovEA100207@yandex.ru";
    const instagram = "zheka.inst";
    const telegram = "zheka4.tg"

    const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <div>
            <div style={{ alignItems: "center", display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{display: "grid", gap: "10px"}}>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 320, height: 320 }}
                    />
                
                    <Button variant="contained" disableElevation style={{marginTop: "20px"}}>
                        Редактировать профиль
                    </Button>
                </div>
                
                <div style={{ justifyContent: 'left', marginLeft: '50px', marginTop: "20px" }}>
                    <Typography variant="h4">
                        {fullName}
                    </Typography>

                    <Typography variant="h6" style={{ maxWidth: '600px', wordWrap: 'break-word', marginTop: "20px" }}>
                        {description}
                    </Typography>

                    <Typography variant="h5" style={{ maxWidth: '600px', marginTop: "32px" }}>
                        • Является волонтером {years} лет 
                    </Typography>

                    <Typography variant="h5" style={{maxWidth: '600px'}}>
                        • {countOfAnimals} животных нашли дом 
                    </Typography>
                    
                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                        <div style={{margin: "32px", marginRight: "80px"}}>
                            <div style={{ display: 'flex', justifyContent: "left" }}> 
                                <PhoneIcon style={{marginTop: "3px", marginRight: "10px"}}/>

                                <Typography variant="h6"> 
                                    {phoneNumber}
                                </Typography>
                            </div>

                            <div style={{ display: 'flex', justifyContent: "left", marginTop: "10px" }}> 
                                <EmailIcon style={{marginRight: "10px"}}/>

                                <Typography variant="h6"> 
                                    {email}
                                </Typography>
                            </div>
                        </div>

                        <div style={{margin: "32px"}}>
                            <div style={{ display: 'flex', justifyContent: "left" }}> 
                                <InstagramIcon style={{marginTop: "3px", marginRight: "10px"}}/>

                                <Typography variant="h6"> 
                                    {instagram}
                                </Typography>
                            </div>

                            <div style={{ display: 'flex', justifyContent: "left", marginTop: "10px" }}> 
                                <TelegramIcon style={{marginRight: "10px"}}/>

                                <Typography variant="h6"> 
                                    {telegram}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Typography variant="h4" style={{margin: "30px"}}>Животные, которые ищут дом</Typography>

            <div style={{ alignItems: "flex-start", display: 'flex', flexWrap: 'wrap', justifyContent: 'left', margin: '20px' }} >
                {cards.map((card, index) => (
                <ImageWithTextCard 
                    key={index}
                    imageUrl={"https://get.wallhere.com/photo/cat-whiskers-look-mammal-vertebrate-cat-like-mammal-small-to-medium-sized-cats-tabby-cat-domestic-short-haired-cat-bengal-european-shorthair-pixie-bob-american-shorthair-muzzle-toyger-lying-on-the-floor-629260.jpg"} 
                    title={"Кот"} 
                    description={"Это кот"} 
                />
                ))}
            </div>
        </div>
    )
}