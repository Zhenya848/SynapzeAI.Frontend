import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SolvingHistories } from "../../api/Endpoints/solvingHistories";
import { SolvingHistoryDto } from "../../models/Dtos/SolvingHistories/SolvingHistoryDto";
import { toast } from "react-toastify";
import { Table } from "@mui/material";
import { SolvingHistoryCard } from "../../components/SolvingHistories/solvingHistoryCard";

export function GetSolvingHistories() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [solvingHistories, setSolvingHistories] = useState<SolvingHistoryDto[]>([]);

    const testId: string = location.state?.testIdData;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                console.log(testId);

                if (!testId)
                    return;

                const solvingHistoriesResponse = await SolvingHistories.get(testId);
                setSolvingHistories(solvingHistoriesResponse.data.result!);
            } 
            catch (error: any) {
                console.log(error);

                error.response.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            } 
            finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            {solvingHistories.map((solvingHistory) => (
                <SolvingHistoryCard solvingHistory={solvingHistory}></SolvingHistoryCard>
            ))}
        </div>
    )
}