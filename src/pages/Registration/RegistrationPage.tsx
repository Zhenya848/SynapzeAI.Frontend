import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../components/context/auth/useAuth";
import { Accounts } from "../../api/Endpoints/accounts";

export function RegistrationPage() {
    const { login, isLoading } = useAuth();

    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;

        if (userName.length < 1) {
            setUserNameError(true);
            toast.error("Имя пользователя не может быть пустым");

            isValid = false;
        }

        if (email.includes("@") == false) {
            setEmailError(true);
            toast.error("Некорректная почта");

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
                await Accounts.register(userName, email, password);
                const loginResult = await login(email, password);

                if (loginResult != null)
                    navigate("/accountInfo");
            }
            catch (error) {
                error.response.data.responseErrors.forEach(e => {
                    toast.error(e.message)
                });
            }
        }
    }

    return (
        <div className="flex flex-col h-full w-full py-6 px-10 justify-center items-start gap-4">
            <NavLink to="/" className="text-lg">
                На главную
            </NavLink>

            <div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-9">
                <form className="flex flex-col w-full items-center gap-7" onSubmit={(e) => handleSubmit(e)}>
                    <TextField 
                    onChange={(e) => setUserName(e.target.value)}
                        variant="standard"
                        error={userNameError}
                        label="Имя пользователя"
                        fullWidth 
                    />

                    <TextField 
                    onChange={(e) => setEmail(e.target.value)}
                        variant="standard"
                        error={emailError}
                        label="Email"
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
            </div>
        </div>
    )
}