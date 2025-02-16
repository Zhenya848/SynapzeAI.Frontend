import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email.includes("@") == false) {
            setEmailError(true);
            toast.error("Некорректная почта");
        }

        if (password.length < 8) {
            setPasswordError(true);
            toast.error("Некорректный пароль");
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

                    <Button type="submit">Войти</Button>
                </form>
            </div>
        </div>
    )
}