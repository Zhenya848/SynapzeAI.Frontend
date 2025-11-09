import { Autocomplete, Box, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface IFilterBlockInfo {
    onSort: (property: string) => void;
    onSearch: (value: string) => void;
}

export function FilterBlock({ onSort, onSearch }: IFilterBlockInfo) 
{
    return (
        <Box component="section" sx={{ p: 1, pr: 4, borderRadius: 3, bgcolor: "#616161",
            margin: '20px',
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 40px)',
            boxSizing: 'border-box',
            position: 'relative',
        }}> 
            <div>
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

            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: "10px" }}>Сортировать по свойству</Typography>

            <Autocomplete
                disablePortal
                options={["Название", "Время прохождения", "Тема"]}
                sx={{ width: '450p' }}
                renderInput={(params) => <TextField {...params} label="Свойство" />}
                onChange={(_event, value) => onSort(value || "")}
            />
        </Box>
    );
}
