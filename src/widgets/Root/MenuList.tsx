import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

export function MenuList() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (pageName: "tests" | "global" | "saved" | "prices") => {
        setAnchorEl(null);

        switch (pageName) {
            case "tests":
                navigate("/tests");
                break;
            case "global":
                navigate("/global");
                break;
            case "saved":
                navigate("/tests/saved");
                break;
            case "prices":
                navigate("/prices");
        }
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
                startIcon={<MenuIcon />}
                style={{marginTop: "4px"}}
            >
                Меню
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                list: {
                    'aria-labelledby': 'basic-button',
                },
                }}
            >
                <MenuItem onClick={() => handleClose("tests")}>Мои викторины</MenuItem>
                <MenuItem onClick={() => handleClose("global")}>Глобальные</MenuItem>
                <MenuItem onClick={() => handleClose("saved")}>Сохраненные</MenuItem>
                <MenuItem onClick={() => handleClose("prices")}>Цены</MenuItem>
            </Menu>
        </div>
    )
}