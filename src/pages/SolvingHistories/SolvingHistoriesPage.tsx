import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete, Box, Button, Pagination, TextField,  Typography } from "@mui/material";
import { SolvingHistoryCard } from "../../entities/solvingHistory/components/SolvingHistoryCard";
import { Test } from "../../entities/test/Test";
import { VerdictIntervalTaskCard } from "../../entities/task/components/VerdictIntervalTaskCard";
import { calculatePriorityNumber } from "../../features/tasks/CalculatePriorityNumber";
import { SolvingHistory } from "../../entities/solvingHistory/SolvingHistory";
import { useGetSolvingHistoriesWithPaginationQuery } from "../../features/solvingHistories/api";
import SearchIcon from '@mui/icons-material/Search';
import { SolvingHistoryCardSkeleton } from "../../entities/solvingHistory/components/SolvingHistoryCardSkeleton";
import { GetCookies } from "../../shared/helpers/api/GetCookies";

enum TestMode {
    OrdinaryMode,
    IntervalMode
}

export function GetSolvingHistories() {
    const location = useLocation();

    const [solvingHistories, setSolvingHistories] = useState<SolvingHistory[]>([]);

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 5;

    const [userName, setUserName] = useState<string| undefined>(undefined);
    const [userTelegram, setUserTelegram] = useState<string| undefined>(undefined);
    const [orderBy, setOrderBy] = useState<string| undefined>(undefined);

    const [testMode, setTestMode] = useState<TestMode>(TestMode.OrdinaryMode);

    const test: Test = location.state?.testData;
    
    const navigate = useNavigate();

    const isRefreshToken = GetCookies("refreshToken");

    const [queryParams, setQueryParams] = useState({
        page: 1,
        pageSize: PAGE_SIZE,
        testId: test.id,
        searchUserName: undefined as string | undefined,
        searchUserTelegram: undefined as string | undefined,
        orderBy: undefined as string | undefined
    });

    const { data: solvingHistoriesData, isLoading, isFetching, error } = useGetSolvingHistoriesWithPaginationQuery(
        queryParams, 
        {skip: !isRefreshToken || !test});

    useEffect(() => {
        if (!test) {
            navigate("/tests")
            return;
        }

        if (!isRefreshToken) {
            navigate("/login")
            return;
        }

        if (solvingHistoriesData) {
            setSolvingHistories(solvingHistoriesData.result!.items);
        }
    }, [solvingHistoriesData])

    useEffect(() => {
        setQueryParams(prev => ({
            ...prev,
            page: page,
            orderBy: orderBy
        }));
    }, [page, orderBy])

    const changeTestMode = (testMode: TestMode) => setTestMode(testMode);

    const handleFiltering = () => {
        setQueryParams(prev => ({
            ...prev,
            page: page,
            searchUserName: userName,
            searchUserTelegram: userTelegram,
            orderBy: orderBy
        }));
    }

    return (
        <div>
            <div style={{margin: "20px", width: "calc(100% - 40px)", display: 'flex', gap: 8}}>
                <Button
                    variant="contained" 
                    color={testMode === TestMode.OrdinaryMode ? 'primary' : 'inherit'}
                    onClick={() => changeTestMode(TestMode.OrdinaryMode)}
                    sx={{
                        color: 'white',
                        width: "100%",
                        wordBreak: 'break-all',
                    }}
                    >
                    Обычный режим
                </Button>

                <Button
                    variant="contained" 
                    color={testMode === TestMode.IntervalMode ? 'primary' : 'inherit'}
                    onClick={() => changeTestMode(TestMode.IntervalMode)}
                    sx={{
                        color: 'white',
                        width: "100%",
                        wordBreak: 'break-all',
                    }}
                    >
                    Режим интервальных повторений
                </Button>
            </div>

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
                        placeholder="Поиск по telegram..."
                        onChange={(e) => setUserTelegram(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Button onClick={handleFiltering} color="inherit" variant="outlined" sx={{marginRight: "10px"}} disabled={isFetching}>
                                    <SearchIcon />
                                </Button>
                            ),
                        }}
                        fullWidth
                        sx={{m: 0, wight: '450p'}}
                        disabled={isFetching}
                    />

                    <TextField
                        variant="outlined"
                        placeholder="Поиск по имени пользователя..."
                        onChange={(e) => setUserName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Button onClick={handleFiltering} color="inherit" variant="outlined" sx={{marginRight: "10px"}} disabled={isFetching}>
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
                    onChange={(_event, value) => {
                        setOrderBy(value || "");
                    }}
                    disabled={isFetching}
                />
            </Box>

            <Pagination 
                onChange={(_event, value) => setPage(value)} 
                count={Math.ceil((solvingHistoriesData?.result?.totalCount ?? 1) / PAGE_SIZE)}
                variant="outlined" 
                color="primary" 
                sx={{margin: "20px"}}
                disabled={isFetching}
            />

            <div style={{display: "flex", flexDirection: "column", gap: 1}}>
                {testMode === TestMode.OrdinaryMode 
                ?
                (   
                    isLoading || !solvingHistoriesData || error 
                    ? 
                    Array.from({ length: 5 }).map((_, index) => (
                        <SolvingHistoryCardSkeleton key={index} />
                    ))
                    :
                    solvingHistories.map((solvingHistory, index) => (
                        <SolvingHistoryCard key={index} solvingHistory={solvingHistory}></SolvingHistoryCard>
                    ))
                )
                : 
                <div style={{ 
                    alignItems: "stretch", 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    justifyContent: "left", 
                    width: "100%", 
                    marginTop: "10px" 
                }}>
                        {test.tasks.map((task, index) => (
                            <VerdictIntervalTaskCard
                                key={index}
                                nameCardInfo={task.taskName}
                                message={task.taskMessage}
                                taskStatistic={task.taskStatistic}
                                progressValue={1 - calculatePriorityNumber(task.taskStatistic)}
                                rightAnswer={task.rightAnswer ?? ""}
                                answers={task.answers}>
                            </VerdictIntervalTaskCard>
                        ))}
                </div>}
            </div>
        </div>
    )
}