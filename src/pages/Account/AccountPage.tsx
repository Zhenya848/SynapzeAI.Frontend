import { Box, Button, TextField, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { useAuth } from "../../components/context/auth/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate } from "react-router-dom";
import { DialogWindow } from "../../components/DialogWindow";
import SaveIcon from '@mui/icons-material/Save';
import { Accounts } from "../../api/Endpoints/accounts";

export function AccountPage() {
    const { user, refresh, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    const [isUpdateUserDataDialogOpen, setIsUpdateUserDataDialogOpen] = useState(false);

    const [newUserName, setNewUserName] = useState("");

    const navigate = useNavigate();

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

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    const handleUpdateUserDataDialogClose = () => setIsUpdateUserDataDialogOpen(false);
    const handleUpdateUserDataDialogOpen = () => setIsUpdateUserDataDialogOpen(true);

    const handleOptionUpdateUserDataDialogSelect = async () => {
        try {
            setIsLoading(true);

            await Accounts.updateUser(user.id, newUserName);
            await refresh();
        }
        catch (error: any) {
            error.response.data.responseErrors.forEach((e: { message: string }) => {
                toast.error(e.message);
            });
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Box sx={{margin: "20px", width: "calc(100% - 40px)", gap: "10px", display: "flex", '@media (max-width: 1030px)': { flexDirection: 'column', gap: "40px" }}}>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Box sx={{width: "auto", textAlign: "left"}}>
                    <div style={{ display: 'flex', justifyContent: "left" }}> 
                        <EmailIcon style={{marginRight: "10px"}}/>

                        <Typography variant="h5"> 
                            Почта: {user.email}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: "left", marginTop: "10px" }}> 
                        <BadgeIcon style={{marginRight: "10px"}}/>

                        <Typography variant="h5"> 
                            Имя пользователя: {user.userName}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: "left", marginTop: "10px" }}> 
                        <BadgeIcon style={{marginRight: "10px"}}/>

                        <Typography variant="h5"> 
                            Имя пользователя в системе: {user.uniqueUserName}
                        </Typography>
                    </div>
                </Box>
            </div>

            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Box sx={{width: "auto", textAlign: "left"}}>
                    <div style={{ display: 'flex', justifyContent: "left" }}> 
                        <EmailIcon style={{marginRight: "10px"}}/>

                        <Typography variant="h5"> 
                            Всего решённых викторин: {10}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', justifyContent: "left", marginTop: "10px" }}> 
                        <BadgeIcon style={{marginRight: "10px"}}/>

                        <Typography variant="h5"> 
                            Процент правильных ответов: {25}%
                        </Typography>
                    </div>
                </Box>
            </div>

            <Button variant="contained" onClick={handleUpdateUserDataDialogOpen} color="primary" disableElevation style={{ width: "100%", color: 'white' }}>
                Редактировать информацию
            </Button>

            <Button variant="contained" onClick={handleLogout} color="error" disableElevation style={{ width: "100%", color: 'white' }}>
                Выйти из аккаунта
            </Button>

            <DialogWindow
                open={isUpdateUserDataDialogOpen}
                onClose={handleUpdateUserDataDialogClose}
                onConfirm={handleOptionUpdateUserDataDialogSelect}
                title = "Изменение пользовательских данных"
                confirmText = "Изменить"
                cancelText = "Отмена"
                dialogContentChildren={
                    <div style={{marginTop: "10px"}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Имя пользователя" 
                            value={newUserName} 
                            onChange={(e) => setNewUserName(e.target.value)} 
                            variant="outlined" 
                            style={{ width: "100%" }} />
                    </div>
                }
                confirmButtonBackgroundColor="#00BFFF"
                confirmButtonIcon={<SaveIcon />}
            />
        </Box>
    )
}