import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

interface IFilterBlockInfo {
    onFilter: (userName: string, telegram: string, orderBy: string) => void;
}

export function SolvingHistoriesFilterBlock({ onFilter }: IFilterBlockInfo) 
{
    const [userName, setUserName] = useState("");
    const [userTelegram, setUserTelegram] = useState("");
    const [orderBy, setOrderBy] = useState("");

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
                    placeholder="Поиск по telegram..."
                    onChange={(e) => setUserTelegram(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Button color="inherit" onClick={() => onFilter(userName, userTelegram, orderBy)} variant="outlined" sx={{marginRight: "10px"}}>
                                <SearchIcon />
                            </Button>
                        ),
                    }}
                    fullWidth
                    sx={{m: 0, wight: '450p'}}
                />

                <TextField
                    variant="outlined"
                    placeholder="Поиск по имени пользователя..."
                    onChange={(e) => setUserName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Button color="inherit" onClick={() => onFilter(userName, userTelegram, orderBy)} variant="outlined" sx={{marginRight: "10px"}}>
                                <SearchIcon />
                            </Button>
                        ),
                    }}
                    fullWidth
                    sx={{m: 0, wight: '450p', marginTop: "20px"}}
                />
            </div>

            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: "10px" }}>Сортировать по свойству</Typography>
            
            <Autocomplete
                disablePortal
                options={["По успешности прохождения (сверху вниз)", "По успешности прохождения (снизу вверх)", "Время решения"]}
                sx={{ width: '450p' }}
                renderInput={(params) => <TextField {...params} label="Свойство" />}
                onChange={(event, value) => {
                    setOrderBy(value || "");
                    onFilter(userName, userTelegram, value || "");
                }}
            />
        </Box>
    );
}
