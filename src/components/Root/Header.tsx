import { AppBar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';

export function Header() {
    const { user } = useAuth();

    return (
        <AppBar position="static">
            <div className='flex flex-row items-center justify-between py-2 px-3'>
                <div className='flex flex-row gap-5 items-center justify-center'>
                    <NavLink to="/main" className="text-2xl pr-5">Synapze AI</NavLink>
                    <NavLink to="/tests">Мои квизы</NavLink>
                    <NavLink to="/global">Глобальные квизы</NavLink>
                </div>

                {user ? <NavLink to="/accountInfo">Аккаунт</NavLink> : <NavLink to="/login">Войти</NavLink>}
            </div>
        </AppBar>
    );
  }