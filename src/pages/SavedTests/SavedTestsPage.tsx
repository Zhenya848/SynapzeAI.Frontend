import { Autocomplete, Box, Button, Pagination, TextField, Typography } from "@mui/material";
import { GlobalTestCardSkeleton } from "../../entities/test/components/GlobalTestCardSkeleton";
import StartDecideSelectionPanel from "../../entities/test/components/StartDecideSelectionPanel";
import { GlobalTestCard } from "../../entities/test/components/GlobalTestCard";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useAddSavedTestMutation, useDeleteSavedTestMutation, useGetSavedTestsWithPaginationQuery } from "../../features/tests/api";
import { Test } from "../../entities/test/Test";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GetCookies } from "../../shared/helpers/api/GetCookies";

export function SavedTestsPage() {
    const navigate = useNavigate();

    const [testId, setTestId] = useState<string | undefined>();

    const [isStartDecideTestDialogOpen, setIsStartDecideTestDialogOpen] = useState(false);

    const [tests, setTests] = useState<Test[]>([]);

    const isRefreshToken = GetCookies("refreshToken");

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 5;

    const [testName, setTestName] = useState<string | undefined>(undefined);
    const [testTheme, setTestTheme] = useState<string | undefined>(undefined);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [orderBy, setOrderBy] = useState<string | undefined>(undefined);

    const [queryParams, setQueryParams] = useState({
        page: 1,
        pageSize: PAGE_SIZE,
        searchTestName: undefined as string | undefined,
        searchTestTheme: undefined as string | undefined,
        searchUserName: undefined as string | undefined,
        orderBy: undefined as string | undefined
    });

    const { data: testsData, isLoading, isFetching, error } = useGetSavedTestsWithPaginationQuery(queryParams, {skip: !isRefreshToken});
    const [saveTest] = useAddSavedTestMutation();
    const [deleteSavedTest] = useDeleteSavedTestMutation();

    useEffect(() => {
        if (!isRefreshToken) {
            navigate("/login");
            return;
        }

        if (testsData) {
            setTests(testsData.result!.items);
        }
    }, [isRefreshToken, navigate, testsData]);

    useEffect(() => {
        setQueryParams(prev => ({
            ...prev,
            page: page,
            orderBy: orderBy
        }));
    }, [page, orderBy])

    const handleStartDecideTestDialogOpen = (testId: string) => {
        setTestId(testId);
        setIsStartDecideTestDialogOpen(true);
    }
    const handleStartDecideTestDialogClose = () => setIsStartDecideTestDialogOpen(false);

    const handleOptionStartDecideTestDialogSelect = (option: string) => {
        handleStartDecideTestDialogClose();

        const testData = tests.find(t => t.id === testId);

        if (!testData)
            return;

        if (testData.tasks.length === 0) {
            toast.warn("Эта викторина пока пустая и не содержит задач для решения");

            return;
        }

        switch (option) {
            case "intervalMode":
                navigate("/tests/decideWithInterval", { state: { testData } })
                break;
            case "ordinaryMode":
                navigate("/tests/decide", { state: { testData } });
                break;
        }
    };

    const handleShowSolvingHistoriesSelect = (testId: string) => {
        const testData = tests.find(i => i.id === testId);

        if (!testData)
            return;

        navigate("/tests/solvingHistories", { state: { testData } });
    }

    const handleFiltering = () => {
        setQueryParams(prev => ({
            ...prev,
            page: page,
            searchTestName: testName,
            searchTestTheme: testTheme,
            searchUserName: userName,
            orderBy: orderBy
        }));
    }

    const handleSaveTest = async (testId: string) => {
        try {
            const test = tests.find(i => i.id == testId);

            if (!test)
                return;

            if (test.isSaved) {
                await deleteSavedTest({ testId: testId }).unwrap();
            }
            else {
                await saveTest({ testId: testId }).unwrap();
            }
        } 
        catch (err) {
            console.error('Failed: ', err);
            
            toast.error("Произошла ошибка");
        }
    };

    return (
        <div style={{alignItems: "flex-start",  display: 'flex', flexDirection: "column"}}>
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
                        onChange={(e) => setTestName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Button 
                                    onClick={handleFiltering} 
                                    color="inherit" 
                                    variant="outlined" 
                                    sx={{marginRight: "10px"}} 
                                    disabled={isFetching}>
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
                                <Button 
                                    onClick={handleFiltering} 
                                    color="inherit" 
                                    variant="outlined" 
                                    sx={{marginRight: "10px"}} 
                                    disabled={isFetching}>
                                        <SearchIcon />
                                </Button>
                            ),
                        }}
                        fullWidth
                        sx={{m: 0, wight: '450p'}}
                    />

                    <Typography variant="h6" style={{ marginBottom: '10px', marginTop: "20px" }}>Поиск по имени пользователя</Typography>

                    <TextField
                        variant="outlined"
                        placeholder="Поиск..."
                        onChange={(e) => setUserName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Button 
                                    onClick={handleFiltering} 
                                    color="inherit" 
                                    variant="outlined" 
                                    sx={{marginRight: "10px"}} 
                                    disabled={isFetching}>
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
                    onChange={(_event, value) => {
                        setOrderBy(value || "");
                    }}
                    disabled={isFetching}
                />
            </Box>

            <Pagination 
                onChange={(_event, value) => setPage(value)} 
                count={Math.ceil((testsData?.result?.totalCount ?? 1) / PAGE_SIZE)}
                variant="outlined" 
                color="primary" 
                sx={{margin: "10px"}}
                disabled={isFetching}
            />

            <Box
                sx={{
                    height: "80vh",
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflowX: 'hidden',
                    overflowY: "auto",
                    gap: 1,
                    p: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                {isLoading || !testsData || error 
                ? 
                Array.from({ length: 5 }).map((_, index) => (
                    <GlobalTestCardSkeleton key={index} />
                ))
                :
                tests.map((card, index) => (
                    <GlobalTestCard
                        key={index}
                        test={card}
                        onStartDecide={handleStartDecideTestDialogOpen}
                        onShowSolvingHistories={handleShowSolvingHistoriesSelect}
                        onSavingTest={handleSaveTest}>
                    </GlobalTestCard>
                ))}
            </Box>

            <StartDecideSelectionPanel
                isOpen={isStartDecideTestDialogOpen}
                onClose={handleStartDecideTestDialogClose}
                onOptionSelect={handleOptionStartDecideTestDialogSelect}
            />
        </div>
    )
}