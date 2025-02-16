import { Autocomplete, Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export function FilterBlock() 
{
    interface Props {
        labelText: string,
        options: Array<string>,
    }

    function AutocompleteBlock({labelText, options} : Props)
    {
        return (
            <div className="py-2">
                <h4>{labelText}</h4>

                <Autocomplete
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={labelText} />}
                    />
            </div>
        )
    }

    return (
        <Box component="section" sx={{ p: 1, pr: 4, borderRadius: 3, bgcolor: "#616161", margin: '20px'} }> 
            <div className="text-3xl pr-5">Поиск и сортировка</div>

            <div className="py-5">
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                    Поиск по имени
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Поиск..."
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    fullWidth
                    sx={{m: 0, wight: '450p'}}
                    />
            </div>

            <div>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                    Сортировка
                </Typography>
                
                <div>
                    <AutocompleteBlock labelText="Пол" options={["Мужской", "Женский"]}/>
                    <AutocompleteBlock labelText="Окрас" options={["Мужской", "Женский"]}/>
                    <AutocompleteBlock labelText="Пол" options={["Мужской", "Женский"]}/>
                    <AutocompleteBlock labelText="Пол" options={["Мужской", "Женский"]}/>
                    <AutocompleteBlock labelText="Пол" options={["Мужской", "Женский"]}/>
                </div>
            </div>
        </Box>
    );
}
