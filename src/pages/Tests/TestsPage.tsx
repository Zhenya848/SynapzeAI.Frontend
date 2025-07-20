import { Box, Button, Typography } from "@mui/material"
import { FilterBlock } from "../../components/FilterBlock"
import { TestCard } from "../../components/TestCard"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import SelectionPanel from "../../components/SelectionPanel";
import { ConfirmDialog } from "../../components/ConfitmDialog";
import { handlePublishedFilter } from "../../components/FilterHandles/handlePublishedFilter";
import { handleTimeLimitFilter } from "../../components/FilterHandles/handleTimeLimitFilter";
import { handleSearch } from "../../components/FilterHandles/handleSearch";
import { handleSort } from "../../components/FilterHandles/handleSort";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/auth/useAuth";
import { Tests } from "../../api/tests";
import { TestDto } from "../../models/Dtos/TestDto";
import { toast } from "react-toastify";

export function GetTests() {
    const navigate = useNavigate();

    const [testId, setTestId] = useState<string | undefined>();
 
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    
    const handleAddDialogOpen = () => setIsAddDialogOpen(true);
    const handleAddDialogClose = () => setIsAddDialogOpen(false);

    const handleDeleteDialogOpen = (testId: string) => {
        setTestId(testId);
        setIsDeleteDialogOpen(true);
    }

    const handleDeleteDialogClose = () => setIsDeleteDialogOpen(false);

    const handleOptionAddDialogSelect = (option: string) => {
        handleAddDialogClose();

        switch (option) {
            case "ai":
                navigate("/tests/createWithAI");
                break;
            case "interval":
                navigate("/tests/createInterval");
                break;
            case "ordinary":
                navigate("/tests/create");
                break;
        }

        console.log(option)
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
        <div style={{alignItems: "flex-start",  display: 'flex'}}>
            <FilterBlock 
                onSort={(property: string) => setSortedTests(handleSort(tests, property))} 
                onPublishedFilter={(property: string) => setSortedTests(handlePublishedFilter(tests, property))}
                onTimeLimitFilter={(property: string) => setSortedTests(handleTimeLimitFilter(tests, property))}
                onSearch={(property: string) => setSortedTests(handleSearch(tests, property))}
            />
        
            <div style={{ alignItems: "flex-end", display: 'flex', flexWrap: 'wrap', margin: '20px', justifyContent: "right", flexDirection: "column" }}>
                <p><Button variant="contained" color="success" sx={{ color: 'white'}} startIcon={<AddIcon />} onClick={handleAddDialogOpen}>Добавить</Button></p>

                <Box
                    sx={{
                        height: "80vh",
                        width: "70vw",
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
                            onUpdate={handleChangeSelect}>
                        </TestCard>
                    ))}
                </Box>
            </div>

            <SelectionPanel 
                open={isAddDialogOpen}
                onClose={handleAddDialogClose}
                onOptionSelect={handleOptionAddDialogSelect}
            />

            <ConfirmDialog
                open={isDeleteDialogOpen}
                onClose={handleDeleteDialogClose}
                onConfirm={handleOptionDeleteDialogSelect}
            />
        </div>
    )
}