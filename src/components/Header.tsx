import { AppBar } from '@mui/material';
import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <AppBar position="static">
            <div className='flex flex-row items-center justify-between py-2 px-3'>
                <div className='flex flex-row gap-4 items-center justify-center'>
                    <NavLink to="/main" className="text-2xl pr-5">Pet Volunteer</NavLink>
                    <NavLink to="/pets">Мои питомцы</NavLink>
                    <NavLink to="/accountInfo">Аккаунт</NavLink>
                    <NavLink to="/volunteerManagement">Управление волонтерами</NavLink>
                </div>
                <NavLink to="/login">Войти</NavLink>
            </div>
        </AppBar>
    );
  }