import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useLoginMutation, useRegisterMutation, useVerifyUserMutation } from "../../features/accounts/api";
import { useAppDispatch } from "../../app/store";
import { setCredentials } from "../../features/accounts/auth.slice";
import { getErrorMessages } from "../../shared/utils/getErrorMessages";

export function RegistrationPage() {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState(false);
    const [telegram, setTelegram] = useState("");
    const [telegramError, setTelegramError] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState(false);

    const dispatch = useAppDispatch();

    const [register] = useRegisterMutation();
    const [login] = useLoginMutation();
    const [verify] = useVerifyUserMutation();

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                if (code.length === 5) {
                    setCodeError(false);
                    setCode("");

                    await verify({ telegram: telegram, code: code }).unwrap();
                    await handleLogin();
                }
            }
            catch (error: any) {
                setCodeError(true);

                getErrorMessages(error).map(error => {
                    toast.error(error);
                });
            }
        }

        fetch();
    }, [code])

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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

                await register({ userName: userName, telegram: telegram, password: password }).unwrap();
                toast.info("Мы отправили код подтверждения на указанный telegram");
            }
            catch (error: any) {
                console.log(error);

                getErrorMessages(error).map(error => {
                    toast.error(error);
                });
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    const handleLogin = async () => {
        try {
            const loginResponse = await login({ telegram: telegram, password: password }).unwrap();
            dispatch(setCredentials({ accessToken: loginResponse.result!.accessToken, user: loginResponse.result!.user }));

            navigate("/accountInfo");
        }
        catch (error: any) {
            console.error(error);

            getErrorMessages(error).map(error => {
                toast.error(error);
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-full w-full py-6 justify-center items-start gap-4">
            <div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-5">
                <form className="flex flex-col w-full items-center gap-5" onSubmit={(e) => handleRegister(e)}>
                    <TextField 
                    onChange={(e) => setUserName(e.target.value)}
                        variant="standard"
                        error={userNameError}
                        label="Имя пользователя"
                        fullWidth 
                    />

                    <TextField 
                    onChange={(e) => setTelegram(e.target.value)}
                        variant="standard"
                        error={telegramError}
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

                    <TextField 
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                        variant="standard"
                        label="Повторите пароль"
                        fullWidth 
                    />

                    <Button type="submit" disabled = {isLoading}>Зарегистрироваться</Button>
                </form>

                <div style={{display: "flex", gap: 5, marginTop: "10px"}}>
                    <Typography style={{ color: "grey" }}>Шаг1. Откройте </Typography>
                    <Link to="https://t.me/synapze_ai_bot" style={{ textDecoration: 'underline', color: "steelblue" }}>
                        бота
                    </Link>
                    <Typography style={{ color: "grey" }}>и введите любое сообщение</Typography>
                </div>

                <Typography style={{ color: "grey" }}>Шаг 2. Нажмите зарегистрироваться и ждите код</Typography>
                <Typography style={{ color: "grey" }}>Шаг 3. Введите код подтверждения ниже: </Typography>

                <TextField 
                onChange={(e) => setCode(e.target.value)}
                    variant="standard"
                    label="Код подтверждения"
                    error={codeError}
                    value={code}
                    fullWidth 
                />
            </div>
        </div>
    )
}