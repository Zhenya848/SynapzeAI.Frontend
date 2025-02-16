import { Box, Button, Card, CardMedia, Typography } from "@mui/material";

interface ICardInfo {
    title: string,
    value: string
}

interface IPetCardInfo {
    imageUrl: string;

    nameCardInfo: string,
    attitudeTowardsPeople: string,
    ageInfo: string,
    attitudeTowardsAnimals: string,
    isVactinated: boolean,
    telephoneNumber: string
}

function CardInfo({title, value}: ICardInfo)
{
    return (
        <div>
            <Typography style={{color: "lightgrey"}}>{title + ":"}</Typography>
            <Typography variant="h6">{value}</Typography>
        </div>
    );
}

export function PetCard({imageUrl, nameCardInfo, attitudeTowardsPeople, ageInfo, attitudeTowardsAnimals, isVactinated, telephoneNumber}: IPetCardInfo) {
    return (
        <Box component="section" sx={{ p: 1, borderRadius: 3, bgcolor: "#616161", margin: '20px', alignItems: "center", display: 'flex', justifyContent: 'left'}}>
            <Card sx={{ maxWidth: 200, margin: '10px' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt="image"
                />
            </Card>

            <div style={{marginLeft: "30px", margin: "10px", width: "100%", boxSizing: 'border-box'}}>
                <CardInfo title="Имя" value={nameCardInfo} />
                <div style={{marginTop: "20px"}}><CardInfo title="Отношение к людям" value={attitudeTowardsPeople} /></div>
            </div>

            <div style={{margin: "10px", width: "100%", boxSizing: 'border-box'}}>
                <CardInfo title="Отношение к животным" value={attitudeTowardsAnimals} />
                <div style={{marginTop: "20px"}}><CardInfo title="Возраст" value={ageInfo} /></div>
            </div>

            <div style={{margin: "10px", width: "100%", boxSizing: 'border-box'}}>
                <CardInfo title="Вакцинация" value={isVactinated ? "Есть" : "Нет"} />
                <div style={{marginTop: "20px"}}><CardInfo title="Телефон для связи" value={telephoneNumber} /></div>
            </div>

            <div style={{margin: "20px", width: "100%", boxSizing: 'border-box'}}>
                <p><Button variant="outlined">Изменить</Button></p>
                <p style={{marginTop: "40px"}}><Button variant="contained" color="error">Удалить</Button></p>
            </div>
        </Box>
    )
}