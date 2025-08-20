import { Box, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Tests } from "../../api/Endpoints/tests";
import { toast } from "react-toastify";
import StartDecideSelectionPanel from "../../components/SelectionPanel/StartDecideSelectionPanel";
import { GlobalTestCard } from "../../components/Tests/GlobalTestCard";
import { number } from "framer-motion";
import { useAuth } from "../../components/context/auth/useAuth";
import { GlobalFilterBlock } from "../../components/FilterBlocks/GlobalFilterBlock";
import { TestDto } from "../../models/Api/Tests/TestDto";

export function GlobalTests() {
    const navigate = useNavigate();

    const [testId, setTestId] = useState<string | undefined>();

    const [isStartDecideTestDialogOpen, setIsStartDecideTestDialogOpen] = useState(false);

    const [tests, setTests] = useState<TestDto[] | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const PAGE_SIZE = 10;

    const { user, refresh } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await Tests.getWithPagination(page, PAGE_SIZE, user?.id);

                setTests(response.data.result!.items);

                if (!user) {
                    await refresh();
                }
            } 
            catch (error: any) {
                error.response.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page]);

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (!tests) {
        return <Typography>Что-то пошло не так</Typography>;
    }

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

        if (!user) {
            navigate("/login");
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[1-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }
    };

    const handleFilter = async (testName: string, testTheme: string, userName: string, orderBy: string) => {
        try {
            const response = await Tests.getWithPagination(page, PAGE_SIZE, user?.id, testName, testTheme, userName, orderBy);

            setTests(response.data.result!.items);
        }
        catch (error: any) {
            error.response.data.responseErrors.forEach((e: { message: string }) => {
                toast.error(e.message);
            });
        }
    }

    const handleShowSolvingHistoriesSelect = (testId: string) => {
        const testData = tests.find(i => i.id === testId);

        if (!testData)
            return;

        navigate("/tests/solvingHistories", { state: { testData } });
    }

    return (
        <div style={{alignItems: "flex-end",  display: 'flex', flexDirection: "column"}}>
            <GlobalFilterBlock
                onFilter={(testName: string, testTheme: string, userName: string, orderBy: string) => handleFilter(testName, testTheme, userName, orderBy)}
            />

            <div style={{margin: "20px", width: "calc(100% - 40px)", display: "flex", height: "50px"}}>
                <ToggleButtonGroup
                    exclusive
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned" onClick={() => setPage(page > 1 ? page - 1 : 1)}>
                        <ArrowBackIosIcon />
                    </ToggleButton>

                    <TextField 
                        sx={{ 
                            '& .MuiInputBase-root': { height: 50, width: 50 }
                        }}
                        value={page}
                        variant="outlined"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setPage(number.parse(e.target.value))}
                        style={{ height: "10px", textAlign: "center" }} 
                    />

                    <ToggleButton value="right" aria-label="right aligned" onClick={() => setPage(page + 1)}>
                        <ArrowForwardIosIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <Box
                sx={{
                    height: "80vh",
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflowX: 'hidden',
                    overflowY: "auto",
                    p: 1
                }}
                >
                {tests.map((card) => (
                    <GlobalTestCard
                        test={card}
                        onStartDecide={handleStartDecideTestDialogOpen}
                        onShowSolvingHistories={handleShowSolvingHistoriesSelect}>
                    </GlobalTestCard>
                ))}
            </Box>

            <StartDecideSelectionPanel
                onOpen={isStartDecideTestDialogOpen}
                onClose={handleStartDecideTestDialogClose}
                onOptionSelect={handleOptionStartDecideTestDialogSelect}
            />
        </div>
    )
}