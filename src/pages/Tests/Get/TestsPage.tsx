import { Box, Button } from "@mui/material"
import { FilterBlock } from "../../../entities/test/components/FilterBlock"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { handleSearch } from "../../../features/tests/FilterHandles/handleSearch";
import { handleSort } from "../../../features/tests/FilterHandles/handleSort";
import { useNavigate } from "react-router-dom";
import { Test } from "../../../entities/test/Test";
import { toast } from "react-toastify";
import AddTestSelectionPanel from "../../../entities/test/components/AddTestSelectionPanel";
import StartDecideSelectionPanel from "../../../entities/test/components/StartDecideSelectionPanel";
import { DialogWindow } from "../../../widgets/DialogWindow";
import DeleteIcon from '@mui/icons-material/Delete';
import { TestCard } from "../../../entities/test/components/TestCard";
import { useAddSavedTestMutation, useDeleteSavedTestMutation, useDeleteTestMutation, useGetTestsQuery } from "../../../features/tests/api";
import { TestCardSkeleton } from "../../../entities/test/components/TestCardSkeleton";
import { GetCookies } from "../../../shared/helpers/api/GetCookies";

export function GetTests() {
    const navigate = useNavigate();

    const [tests, setTests] = useState<Test[]>([]);
    const [sortedTests, setSortedTests] = useState<Test[]>([]);

    const [testId, setTestId] = useState<string | undefined>();
 
    const [isCreateTestDialogOpen, setIsCreateTestDialogOpen] = useState(false);
    const [isDeleteTestDialogOpen, setIsDeleteTestDialogOpen] = useState(false);
    const [isStartDecideTestDialogOpen, setIsStartDecideTestDialogOpen] = useState(false);

    const isRefreshToken = GetCookies("refreshToken");
    
    const { data: testsData, isLoading, error } = useGetTestsQuery(undefined, {skip: !isRefreshToken});
    const [deleteTest] = useDeleteTestMutation();
    const [saveTest] = useAddSavedTestMutation();
    const [deleteSavedTest] = useDeleteSavedTestMutation();

    useEffect(() => {
        if (!isRefreshToken) {
            navigate("/login")
            return;
        }

        if (testsData) {
            setTests(testsData.result!);
            setSortedTests(testsData.result!);
        }
    }, [isRefreshToken, navigate, testsData])
    
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

        const testData = sortedTests.find(t => t.id === testId);

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

    const handleOptionDeleteDialogSelect = () => {
        const fetchData = async () => {
            try {
                if (testId)
                    await deleteTest({ testId: testId }).unwrap();
            }
            catch (error: any) {
                error.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            } 
        }

        fetchData();

        handleDeleteDialogClose();
    };

    const handleChangeSelect = (testData: Test) => {
        navigate("/tests/update", { state: { testData: testData } });
    }

    const handleShowSolvingHistoriesSelect = (testId: string) => {
        const testData = sortedTests.find(i => i.id === testId);

        if (!testData)
            return;

        navigate("/tests/solvingHistories", { state: { testData } });
    }

    const handleCopyLink = async (testId: string) => {
        try {
            await navigator.clipboard.writeText("https://synapzeai.ru/tests/decide/" + testId);

            toast.info("Ссылка на викторину скопирована!");
        } 
        catch (err) {
            console.error('Failed to copy: ', err);
            
            toast.error("Произошла ошибка при копировании ссылки");
        }
    };

    const handleSaveTest = async (testId: string) => {
        try {
            const test = sortedTests.find(i => i.id == testId);

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
        <div style={{alignItems: "flex-end",  display: 'flex', flexDirection: "column"}}>
            <FilterBlock 
                onSort={(property: string) => setSortedTests(handleSort(tests, property))}
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
                    gap: 1,
                    p: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                {isLoading || !testsData || error 
                ? 
                Array.from({ length: 5 }).map((_, index) => (
                    <TestCardSkeleton key={index} />
                ))
                :
                sortedTests.map((card, index) => (
                    <TestCard 
                        key={index}
                        test={card}
                        onDelete={handleDeleteDialogOpen}
                        onUpdate={handleChangeSelect}
                        onStartDecide={handleStartDecideTestDialogOpen}
                        onShowSolvingHistories={handleShowSolvingHistoriesSelect}
                        onCopyLink={handleCopyLink}
                        onSavingTest={handleSaveTest}>
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

            <DialogWindow
                open={isDeleteTestDialogOpen}
                onClose={handleDeleteDialogClose}
                onConfirm={handleOptionDeleteDialogSelect}
                title = "Вы точно хотите удалить викторину?"
                confirmText = "Удалить"
                cancelText = "Отмена"
                dialogContentChildren={
                    <div style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                        Это действие нельзя будет отменить
                    </div>
                }
                confirmButtonBackgroundColor="#d32f2f"
                confirmButtonIcon={<DeleteIcon />}
            />
        </div>
    )
}