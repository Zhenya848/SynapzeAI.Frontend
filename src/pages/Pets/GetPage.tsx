import { Button, Card, CardMedia, Checkbox, FormControlLabel, TextField} from "@mui/material";

export function GetPage() {

    const name = "Пушок";
    const description = "АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА";
    const color = "Серый";
    const healthInfo = "БББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББББ";
    const telephoneNumber = "+79163883351";

    const street = "Москворечье";
    const town = "Москва";
    const state = "Москворечье Сабурово";
    const zipCode = "";

    const weight = "0,1";
    const height = "12";

    const isPetCaustrated = true;
    const isPetVactinated = false;

    const attitudeTowardsPeople = "Хорошее";
    const attitudeTowardsAnimals = "Боится";

    const birthday = "10/02/2007"

    return (
        <div style={{margin: "10px"}}>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: "flex-start" }}>
                <Card sx={{ maxWidth: 550 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://get.wallhere.com/photo/cat-whiskers-look-mammal-vertebrate-cat-like-mammal-small-to-medium-sized-cats-tabby-cat-domestic-short-haired-cat-bengal-european-shorthair-pixie-bob-american-shorthair-muzzle-toyger-lying-on-the-floor-629260.jpg"
                        alt="image"
                    />
                </Card>

                <div style={{width: "100%", marginLeft: "10px"}}>
                    <TextField disabled id="filled-disabled" label="Имя" defaultValue={name} variant="filled" style={{ width: "100%" }}/>
                    <TextField disabled id="filled-disabled" label="Описание" defaultValue={description} variant="filled" style={{ width: "100%", marginTop: "20px" }}/>
                    <TextField disabled id="filled-disabled" label="Цвет" defaultValue={color} variant="filled" style={{ width: "100%", marginTop: "20px" }}/>
                    <TextField disabled id="filled-disabled" label="Информация о здоровье" defaultValue={healthInfo} variant="filled" style={{ width: "100%", marginTop: "20px" }}/>
                    <TextField disabled id="filled-disabled" label="Номер телефона для связи" defaultValue={telephoneNumber} variant="filled" style={{ width: "100%", marginTop: "20px" }}/>
                </div>
            </div>

            <div style={{ display: "flex", marginTop: "40px"}}>
                <TextField disabled id="filled-disabled" label="Улица" defaultValue={street} variant="filled" style={{ width: "100%" }}/>
                <TextField disabled id="filled-disabled" label="Город" defaultValue={town} variant="filled" style={{ width: "100%", marginLeft: "20px" }}/>
                <TextField disabled id="filled-disabled" label="Район" defaultValue={state} variant="filled" style={{ width: "100%", marginLeft: "20px" }}/>
                <TextField disabled id="filled-disabled" label="ZIP – код" defaultValue={zipCode} variant="filled" style={{ width: "100%", marginLeft: "20px" }}/>
            </div>

            <div style={{ display: "flex", marginTop: "40px"}}>
                <TextField disabled id="filled-disabled" label="Рост" defaultValue={weight} variant="filled" style={{ width: "100%" }}/>
                <TextField disabled id="filled-disabled" label="Вес" defaultValue={height} variant="filled" style={{ width: "100%", marginLeft: "20px" }}/>
                <FormControlLabel disabled control={<Checkbox defaultChecked={isPetCaustrated} />} label="Питомец кастрирован" style={{width: "100%", marginLeft: "10px"}}/>
                <FormControlLabel disabled control={<Checkbox defaultChecked={isPetVactinated} />} label="Питомец вакцинирован" style={{width: "100%"}} />
            </div> 

            <div style={{ display: "flex", marginTop: "40px"}}>
                <TextField disabled id="filled-disabled" label="Отношение к людям" defaultValue={attitudeTowardsPeople} variant="filled" style={{ width: "100%" }}/>
                <TextField disabled id="filled-disabled" label="Отношение к животным" defaultValue={attitudeTowardsAnimals} variant="filled" style={{ width: "100%", marginLeft: "20px" }}/>
            </div> 

            <TextField disabled id="filled-disabled" label="День рождения" defaultValue={birthday} variant="filled" style={{ width: "100%", marginTop: "40px" }}/>

            <Button variant="contained" color="error" disableElevation style={{width: "100%", marginTop: "40px"}}> Закрыть </Button>
        </div>
    )
}