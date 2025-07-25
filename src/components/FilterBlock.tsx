import { Autocomplete, Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface IFilterBlockInfo {
    onSort: (property: string) => void;
    onPublishedFilter: (value: string) => void;
    onTimeLimitFilter: (value: string) => void;
    onSearch: (value: string) => void;
}

export function FilterBlock({ onSort, onPublishedFilter, onTimeLimitFilter, onSearch }: IFilterBlockInfo) 
{
    return (
        <Box component="section" sx={{ p: 1, pr: 4, borderRadius: 3, bgcolor: "#616161",
            margin: '20px',
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 40px)',
            boxSizing: 'border-box',
            position: 'relative',
        }}> 
            <div className="text-3xl pr-5">Поиск и сортировка</div>

            <div className="py-5">
                <Typography variant="h6" style={{ marginBottom: '10px' }}>Поиск по названию</Typography>
                
                <TextField
                    variant="outlined"
                    placeholder="Поиск..."
                    onChange={(e) => onSearch(e.target.value)}
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
                <Typography variant="h6" style={{ marginBottom: '10px' }}>Сортировка</Typography>
                
                <div>
                    <Autocomplete
                        disablePortal
                        options={["Есть", "Нет"]}
                        sx={{mb: 2, wight: '450p'}}
                        renderInput={(params) => <TextField {...params} label="Ограничение по времени" />}
                        onChange={(event, value) => onTimeLimitFilter(value || "")}
                    />

                    <Autocomplete
                        disablePortal
                        options={["Да", "Нет"]}
                        sx={{mb: 2, wight: '450p'}}
                        renderInput={(params) => <TextField {...params} label="Опубликовано" />}
                        onChange={(event, value) => onPublishedFilter(value || "")}
                    />
                </div>
            </div>

            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: "10px" }}>Сортировать по свойству</Typography>

            <Autocomplete
                disablePortal
                options={["Название", "Время прохождения", "Тема"]}
                sx={{ width: '450p' }}
                renderInput={(params) => <TextField {...params} label="Свойство" />}
                onChange={(event, value) => onSort(value || "")}
            />
        </Box>
    );
}
