import { AppBar, Chip } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/accounts/auth.slice';
import { useEffect, useState } from 'react';
import { MenuList } from './MenuList';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

function useScreenSize() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 650);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 650);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}

export function Header() {
    const user = useSelector(selectUser);
    const isMobile = useScreenSize();
    const navigate = useNavigate();

    return (
        <AppBar position="static" style={{padding: 2}}>
            <div className='flex flex-row items-center justify-between py-2 px-3'>
                {
                    isMobile
                    ?
                    <div className='flex flex-row items-center justify-center'>
                        <NavLink to="/" className="text-2xl">Synapze AI</NavLink>
                        <MenuList />
                    </div>
                    :
                    <div className='flex flex-row gap-5 items-center justify-center'>
                        <NavLink to="/" className="text-2xl pr-5">Synapze AI</NavLink>
                        <NavLink to="/tests">Мои викторины</NavLink>
                        <NavLink to="/global">Глобальные</NavLink>
                        <NavLink to="/tests/saved">Сохраненные</NavLink>
                        <NavLink to="/prices">Цены</NavLink>
                    </div>
                }
                
                <div className='flex flex-row gap-5 items-center justify-center'>
                    {
                        user && 
                        <Chip
                            label={`Баланс: ${user.balance}`}
                            onDelete={() => navigate("/prices")}
                            deleteIcon={<ControlPointIcon />}
                            color = "primary"
                            variant='outlined'
                            style={{color: "white"}}
                        />
                    }

                    {user ? <NavLink to="/accountInfo">Аккаунт</NavLink> : <NavLink to="/login">Войти</NavLink>}
                </div>
            </div>
        </AppBar>
    );
  }