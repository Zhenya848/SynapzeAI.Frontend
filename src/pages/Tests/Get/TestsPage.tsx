import { Box, Button, Typography } from "@mui/material"
import { FilterBlock } from "../../../components/FilterBlock"
import { TestCard } from "../../../components/Tests/TestCard"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { DeleteDialog } from "../../../components/DeleteDialog";
import { handlePublishedFilter } from "../../../models/FilterHandles/handlePublishedFilter";
import { handleTimeLimitFilter } from "../../../models/FilterHandles/handleTimeLimitFilter";
import { handleSearch } from "../../../models/FilterHandles/handleSearch";
import { handleSort } from "../../../models/FilterHandles/handleSort";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/context/auth/useAuth";
import { Tests } from "../../../api/Endpoints/tests";
import { TestDto } from "../../../models/Dtos/Tests/TestDto";
import { toast } from "react-toastify";
import AddTestSelectionPanel from "../../../components/SelectionPanel/AddTestSelectionPanel";
import StartDecideSelectionPanel from "../../../components/SelectionPanel/StartDecideSelectionPanel";
import { TaskDto } from "../../../models/Dtos/Tasks/TaskDto";

export function GetTests() {
    const navigate = useNavigate();

    const [testId, setTestId] = useState<string | undefined>();
 
    const [isCreateTestDialogOpen, setIsCreateTestDialogOpen] = useState(false);

    const [isDeleteTestDialogOpen, setIsDeleteTestDialogOpen] = useState(false);

    const [isStartDecideTestDialogOpen, setIsStartDecideTestDialogOpen] = useState(false);

    const [tests, setTests] = useState<TestDto[] | undefined>(undefined);
    const [sortedTests, setSortedTests] = useState<TestDto[] | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);

    const { user, refresh } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                let userId: string;

                if (!user) {
                    const refreshResult = await refresh();

                    if (refreshResult == null) {
                        setIsLoading(false);
                        return;
                    }

                    userId = refreshResult.userId;
                }
                else
                    userId = user.id

                const response = await Tests.get(userId);

                setTests(response.data.result!);
                setSortedTests(response.data.result!);
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
    }, []);

    if (!user) {
        return <Typography>401 unauthorized</Typography>;
    }

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    if (!tests || !sortedTests) {
        return <Typography>Что-то пошло не так</Typography>;
    }
    
    const handleCreateTestDialogOpen = () => setIsCreateTestDialogOpen(true);
    const handleCreateTestDialogClose = () => setIsCreateTestDialogOpen(false);

    const handleStartDecideTestDialogOpen = (testId: string) => {
        setTestId(testId);
        setIsStartDecideTestDialogOpen(true);
    }
    const handleStartDecideTestDialogClose = () => setIsStartDecideTestDialogOpen(false);

    const handleDeleteDialogOpen = (testId: string) => {
        setTestId(testId);
        setIsDeleteTestDialogOpen(true);
    }
    const handleDeleteDialogClose = () => setIsDeleteTestDialogOpen(false);

    const handleOptionCreateTestDialogSelect = (option: string) => {
        handleCreateTestDialogClose();

        switch (option) {
            case "ai":
                navigate("/tests/createWithAI");
                break;
            case "ordinary":
                navigate("/tests/create");
                break;
        }
    };

    const handleOptionStartDecideTestDialogSelect = (option: string) => {
        handleStartDecideTestDialogClose();

        const tasksData = tests.find(t => t.id === testId)?.tasks;

        console.log(testId)

        if (!tasksData)
            return;

        switch (option) {
            case "intervalMode":
                navigate("/tests/decide")
                break;
            case "ordinaryMode":
                navigate("/tests/decide", { state: { tasksData } });
                break;
        }
    };

    const handleOptionDeleteDialogSelect = () => {
        const fetchData = async () => {
            try {
                if (testId)
                    await Tests.delete(testId)
            }
            catch (error: any) {
                error.response.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            } 
        }

        fetchData();

        setTests(tests.filter(card => card.id !== testId));
        setSortedTests(sortedTests.filter(card => card.id !== testId));

        handleDeleteDialogClose();
    };

    const handleChangeSelect = (testData: TestDto) => {
        navigate("/tests/update", { state: { testData: testData } });
    }

    return (
        <div style={{alignItems: "flex-end",  display: 'flex', flexDirection: "column"}}>
            <FilterBlock 
                onSort={(property: string) => setSortedTests(handleSort(tests, property))} 
                onPublishedFilter={(property: string) => setSortedTests(handlePublishedFilter(tests, property))}
                onTimeLimitFilter={(property: string) => setSortedTests(handleTimeLimitFilter(tests, property))}
                onSearch={(property: string) => setSortedTests(handleSearch(tests, property))}
            />

            <Button 
                variant="contained" 
                color="success" 
                sx={{ marginTop: '40px', marginRight: '30px', color: 'white' }} 
                startIcon={<AddIcon />} 
                onClick={handleCreateTestDialogOpen}>
                    Добавить
            </Button>

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
                {sortedTests.map((card) => (
                    <TestCard 
                        test={card}
                        onDelete={handleDeleteDialogOpen}
                        onUpdate={handleChangeSelect}
                        onStartDecide={handleStartDecideTestDialogOpen}>
                    </TestCard>
                ))}
            </Box>

            <AddTestSelectionPanel
                onOpen={isCreateTestDialogOpen}
                onClose={handleCreateTestDialogClose}
                onOptionSelect={handleOptionCreateTestDialogSelect}
            />

            <StartDecideSelectionPanel
                onOpen={isStartDecideTestDialogOpen}
                onClose={handleStartDecideTestDialogClose}
                onOptionSelect={handleOptionStartDecideTestDialogSelect}
            />

            <DeleteDialog
                open={isDeleteTestDialogOpen}
                onClose={handleDeleteDialogClose}
                onConfirm={handleOptionDeleteDialogSelect}
            />
        </div>
    )
}