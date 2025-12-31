import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useLoginMutation, useRegisterMutation } from "../../features/accounts/api";
import { useAppDispatch } from "../../app/store";
import { setCredentials } from "../../features/accounts/auth.slice";
import { HandleError } from "../../shared/helpers/HandleError";

export function RegistrationPage() {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState(false);
    const [telegram, setTelegram] = useState("");
    const [telegramError, setTelegramError] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [code, setCode] = useState("");

    const dispatch = useAppDispatch();

    const [register] = useRegisterMutation();
    const [login] = useLoginMutation();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            if (code.length === 5) {
                await handleRegister();

                setCode("");
            }
        }

        fetch();
    }, [code])

    const handleRegister = async () => {
        let isValid = true;

        if (userName.length < 1) {
            setUserNameError(true);
            toast.error("Имя пользователя не может быть пустым");

            isValid = false;
        }

        if (telegram.length < 1) {
            setTelegramError(true);
            toast.error("Telegram не может быть пустым");

            isValid = false;
        }

        if (password.length < 8) {
            setPasswordError(true);
            toast.error("Пароль должен быть не меньше 8 символов");

            isValid = false;
        }

        if (password !== repeatedPassword) {
            setPasswordError(true);
            toast.error("Пароли не совпадают");

            isValid = false;
        }

        if (isValid) {
            try {
                setIsLoading(true);

                await register({ userName: userName, telegram: telegram, password: password, code: code }).unwrap();
                
                const loginResponse = await login({ telegram: telegram, password: password }).unwrap();
                dispatch(setCredentials({ accessToken: loginResponse.result!.accessToken, user: loginResponse.result!.user }));

                navigate("/accountInfo");
            }
            catch (error: unknown) {
                HandleError(error);
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="flex flex-col h-full w-full py-6 justify-center items-start gap-4">
            <div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-5">
                <form className="flex flex-col w-full items-center gap-7">
                    <TextField 
                    onChange={(e) => setUserName(e.target.value)}
                        variant="standard"
                        error={userNameError}
                        label="Имя пользователя"
                        disabled={isLoading}
                        fullWidth 
                    />

                    <TextField 
                    onChange={(e) => setTelegram(e.target.value)}
                        variant="standard"
                        error={telegramError}
                        label="Имя пользователя в Telegram через @"
                        disabled={isLoading}
                        fullWidth 
                    />

                    <TextField 
                    onChange={(e) => setPassword(e.target.value)}
                        variant="standard"
                        error={passwordError}
                        label="Пароль"
                        helperText="Не менее 8 символов, должен содержать цифры"
                        disabled={isLoading}
                        fullWidth 
                    />

                    <TextField 
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                        variant="standard"
                        label="Повторите пароль"
                        disabled={isLoading}
                        fullWidth 
                    />
                </form>

                <div style={{width: "auto", display: "flex", flexDirection: "column", gap: 20}}>
                    <a 
                        href="https://t.me/synapze_ai_bot" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', color: "steelblue", textAlign: "center" }}
                    >
                        Запустите бота и введите код ниже
                    </a>

                    <TextField 
                    onChange={(e) => setCode(e.target.value)}
                        variant="standard"
                        label="Код подтверждения"
                        value={code}
                        disabled={isLoading}
                        fullWidth 
                    />
                </div>
            </div>
        </div>
    )
}