import { Button, Card, CardMedia, Checkbox, FormControlLabel, TextField} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export function CreatePage() {

    return (
        <div style={{margin: "10px"}}>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: "flex-start" }}>
                <Card sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://get.wallhere.com/photo/cat-whiskers-look-mammal-vertebrate-cat-like-mammal-small-to-medium-sized-cats-tabby-cat-domestic-short-haired-cat-bengal-european-shorthair-pixie-bob-american-shorthair-muzzle-toyger-lying-on-the-floor-629260.jpg"
                        alt="image"
                    />

                    <Button variant="contained" disableElevation style={{ width: "100%" }}>
                        Добавить фото
                    </Button>
                </Card>

                <div style={{width: "100%", marginLeft: "10px"}}>
                    <TextField id="outlined-basic" label="Имя" variant="outlined" style={{ width: "100%" }} />
                    <TextField id="outlined-basic" label="Описание" variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
                    <TextField id="outlined-basic" label="Цвет" variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
                    <TextField id="outlined-basic" label="Информация о здоровье" variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
                    <TextField id="outlined-basic" label="Телефон для связи" variant="outlined" style={{ width: "100%", marginTop: "20px" }} />
                </div>
            </div>

            <div style={{ display: "flex", marginTop: "40px"}}>
                <TextField id="outlined-basic" label="Улица" variant="outlined" style={{ width: "100%" }} />
                <TextField id="outlined-basic" label="Город" variant="outlined" style={{ width: "100%", marginLeft: "10px" }} />
                <TextField id="outlined-basic" label="Район" variant="outlined" style={{ width: "100%", marginLeft: "10px" }} />
                <TextField id="outlined-basic" label="ZIP – код" variant="outlined" style={{ width: "100%", marginLeft: "10px" }} type="number" />
            </div>

            <div style={{ display: "flex", marginTop: "40px"}}>
                <TextField id="outlined-basic" label="Рост" variant="outlined" style={{ width: "100%" }} type="number"/>
                <TextField id="outlined-basic" label="Вес" variant="outlined" style={{ width: "100%", marginLeft: "10px" }} type="number"/>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Питомец кастрирован" style={{width: "100%", marginLeft: "10px"}}/>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Питомец вакцинирован" style={{width: "100%"}} />
            </div> 

            <div style={{ display: "flex", marginTop: "40px"}}>
                <TextField id="outlined-basic" label="Отношение к людям" variant="outlined" style={{ width: "100%" }} />
                <TextField id="outlined-basic" label="Отношение к животным" variant="outlined" style={{ width: "100%", marginLeft: "10px" }} />
            </div> 

            <LocalizationProvider dateAdapter={AdapterDateFns}> 
                <DatePicker label='День рождения' sx={{ width: "100%", marginTop: "40px"}} /> 
            </LocalizationProvider>

            <div style={{ display: "flex", marginTop: "40px", justifyContent: "center"}}>
                <Button variant="contained" color="success" disableElevation style={{width: "100%", color: "white"}}> Создать </Button>
                <Button variant="contained" color="error" disableElevation style={{width: "100%", marginLeft: "20px"}}> Отмена </Button>
            </div> 
        </div>
    )
}