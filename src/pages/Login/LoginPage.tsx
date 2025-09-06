import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../features/accounts/api";
import { useAppDispatch } from "../../app/store";
import { setCredentials } from "../../features/accounts/auth.slice";

export function LoginPage() {
    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useAppDispatch();

    const [telegram, setTelegram] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;

        if (password.length < 1) {
            setPasswordError(true);
            toast.error("Пароль не может быть пустым");

            isValid = false;
        }
        
        if (isValid) {
            try {
                const response = await login({ telegram: telegram, password: password }).unwrap();

                dispatch(setCredentials({ accessToken: response.result!.accessToken, user: response.result!.user }));
                navigate("/accountInfo");
            }
            catch (error: any) {
                error.data.responseErrors.forEach((e: { message: string }) => {
                    toast.error(e.message);
                });
            }
        }
    }

    return (
        <div className="flex flex-col h-full w-full py-6 justify-center items-start gap-4">
            <div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-9">
                <form className="flex flex-col w-full items-center gap-7" onSubmit={(e) => handleSubmit(e)}>
                    <TextField 
                    onChange={(e) => setTelegram(e.target.value)}
                        variant="standard"
                        label="Telegram"
                        fullWidth 
                    />

                    <TextField 
                    onChange={(e) => setPassword(e.target.value)}
                        variant="standard"
                        error={passwordError}
                        label="Пароль"
                        fullWidth 
                    />

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Button type="submit" disabled = {isLoading}>Войти</Button>

                        <Link to="/register" style={{ textDecoration: 'underline', color: "grey" }}>
                            Нет аккаунта? Зарегистрироваться
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}