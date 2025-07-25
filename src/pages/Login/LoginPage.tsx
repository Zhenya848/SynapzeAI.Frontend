import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../components/context/auth/useAuth";
export function LoginPage() {
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let isValid = true;

        if (email.includes("@") == false) {
            setEmailError(true);
            toast.error("Некорректная почта");

            isValid = false;
        }

        if (password.length < 1) {
            setPasswordError(true);
            toast.error("Пароль не может быть пустым");

            isValid = false;
        }
        
        if (isValid) {
            const loginResult = await login(email, password);

            if (loginResult)
                navigate("/accountInfo");
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
                        label="Password"
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