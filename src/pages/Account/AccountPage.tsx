import { Button, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import { useAuth } from "../../components/context/auth/useAuth";
import { useEffect, useState } from "react";

export function AccountPage() {
    const { user, refresh } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const fullName = "Аккакий Аккакиев Драздрапермович";
    const description = "ААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА";

    const years = 5;
    const countOfAnimals = 8;

    const phoneNumber = "+79773105950";
    const email = "BelovEA100207@yandex.ru";
    const instagram = "zheka.inst";
    const telegram = "zheka4.tg"

    const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                if (!user) {
                    const refreshResult = await refresh();

                    if (refreshResult == null) {
                        setIsLoading(false);
                        return;
                    }
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
    }, []);

    if (!user) {
        return <Typography>401 unauthorized</Typography>;
    }

    if (isLoading) {
        return <Typography>Загрузка...</Typography>;
    }

    return (
        <div style={{width: "100%", display: "flex", marginTop: "20px"}}>
            <div style={{width: "100%"}}>
                <></>

                <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}> 
                    <EmailIcon style={{marginRight: "10px"}}/>

                    <Typography variant="h6"> 
                        Почта: {user?.email ?? "<undefined>"}
                    </Typography>
                </div>

                <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}> 
                    <BadgeIcon style={{marginRight: "10px"}}/>

                    <Typography variant="h6"> 
                        Имя пользователя: {user?.email ?? "<undefined>"}
                    </Typography>
                </div>
            </div>

            <div style={{width: "100%"}}>
                <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}> 
                    <EmailIcon style={{marginRight: "10px"}}/>

                    <Typography variant="h6"> 
                        {user?.email ?? "<undefined>"}
                    </Typography>
                </div>

                <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px" }}> 
                    <EmailIcon style={{marginRight: "10px"}}/>

                    <Typography variant="h6"> 
                        {user?.email ?? "<undefined>"}
                    </Typography>
                </div>
            </div>
        </div>
    )
}