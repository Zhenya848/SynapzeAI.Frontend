import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

interface IFilterBlockInfo {
    onFilter: (testName: string, testTheme: string, userEmail: string, orderBy: string) => void;
}

export function GlobalFilterBlock({ onFilter }: IFilterBlockInfo) 
{
    const [testName, setTestName] = useState("");
    const [testTheme, setTestTheme] = useState("");
    const [userEmail, setUserEmail] = useState("");
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
                    placeholder="Поиск..."
                    onChange={(e) => setTestName(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Button color="inherit" onClick={() => onFilter(testName, testTheme, userEmail, orderBy)} variant="outlined" sx={{marginRight: "10px"}}>
                                <SearchIcon />
                            </Button>
                        ),
                    }}
                    fullWidth
                    sx={{m: 0, wight: '450p'}}
                />

                
                <Typography variant="h6" style={{ marginBottom: '10px', marginTop: "20px" }}>Поиск по теме</Typography>

                <TextField
                    variant="outlined"
                    placeholder="Поиск..."
                    onChange={(e) => setTestTheme(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Button color="inherit" onClick={() => onFilter(testName, testTheme, userEmail, orderBy)} variant="outlined" sx={{marginRight: "10px"}}>
                                <SearchIcon />
                            </Button>
                        ),
                    }}
                    fullWidth
                    sx={{m: 0, wight: '450p'}}
                />

                <Typography variant="h6" style={{ marginBottom: '10px', marginTop: "20px" }}>Поиск по почте создателя</Typography>

                <TextField
                    variant="outlined"
                    placeholder="Поиск..."
                    onChange={(e) => setUserEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Button color="inherit" onClick={() => onFilter(testName, testTheme, userEmail, orderBy)} variant="outlined" sx={{marginRight: "10px"}}>
                                <SearchIcon />
                            </Button>
                        ),
                    }}
                    fullWidth
                    sx={{m: 0, wight: '450p'}}
                />
            </div>

            <Typography variant="h6" style={{ marginBottom: '10px', marginTop: "10px" }}>Сортировать по свойству</Typography>

            <Autocomplete
                disablePortal
                options={["Название", "Тема"]}
                sx={{ width: '450p' }}
                renderInput={(params) => <TextField {...params} label="Свойство" />}
                onChange={(event, value) => {
                    setOrderBy(value || "");
                    onFilter(testName, testTheme, userEmail, value ?? "");
                }}
            />
        </Box>
    );
}
