import { Box, Button, TextField, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate } from "react-router-dom";
import { DialogWindow } from "../../widgets/DialogWindow";
import SaveIcon from '@mui/icons-material/Save';
import { useSelector } from "react-redux";
import { logout, selectUser, setCredentials } from "../../features/accounts/auth.slice";
import { useAppDispatch } from "../../app/store";
import { useLogoutMutation, useRefreshMutation, useUpdateUserMutation } from "../../features/accounts/api";

export function AccountPage() {
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);

    const [refresh] = useRefreshMutation();
    const [updateUser] = useUpdateUserMutation();
    const [logoutUser] = useLogoutMutation();

    const [isUpdateUserDataDialogOpen, setIsUpdateUserDataDialogOpen] = useState(false);

    const [newUserName, setNewUserName] = useState("");

    const navigate = useNavigate();

    const refreshUser = async () => {
        const response = await refresh().unwrap();
        dispatch(setCredentials({ accessToken: response.result!.accessToken, user: response.result!.user }))
    }

    useEffect(() => {
        const fetch = async () => {
            if (!user) {
                await refreshUser();
            }
        }

        fetch();
    }, [])

    if (!user) {
        return <Typography>401 unauthorized</Typography>;
    }

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());

        navigate("/login");
    }

    const handleUpdateUserDataDialogClose = () => setIsUpdateUserDataDialogOpen(false);
    const handleUpdateUserDataDialogOpen = () => setIsUpdateUserDataDialogOpen(true);

    const handleOptionUpdateUserDataDialogSelect = async () => {
        try {
            await updateUser({ userId: user.id, userName: newUserName }).unwrap();

            await refreshUser();
        }
        catch (error: any) {
            error.data.responseErrors.forEach((e: { message: string }) => {
                toast.error(e.message);
            });
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
                </Box>
            </div>

            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <div style={{ display: 'flex', justifyContent: "left", marginTop: "10px" }}> 
                    <BadgeIcon style={{marginRight: "10px"}}/>

                    <Typography variant="h5"> 
                        Имя пользователя в системе: {user.uniqueUserName}
                    </Typography>
                </div>
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