import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { AccountCircle, Pets, Message, Favorite } from '@mui/icons-material';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
interface HeaderProps {
    isLoggedIn: boolean;
    userType: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userType, onLogout }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        onLogout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <PetsIcon sx={{ marginRight: 1 }} />
                </Typography>

                {!isLoggedIn && (
                    <>
                        <Button onClick={() => {
                            navigate('/login');
                        }} color="inherit">Login</Button>
                        <Button 
                            onClick={() => {
                                navigate('/register');
                            }}
                            color="inherit">Register</Button>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {userType === 'CHARITY_WORKER' && (
                                <MenuItem onClick={handleMenuClose}>
                                    <Pets sx={{ marginRight: 1 }} />
                                    My Dogs
                                </MenuItem>
                            )}

                            {userType === 'CHARITY_WORKER' && (
                                <MenuItem onClick={handleMenuClose}>
                                    <Message sx={{ marginRight: 1 }} />
                                    Messages
                                </MenuItem>
                            )}

                            {userType === 'PUBLIC' && (
                                <MenuItem onClick={handleMenuClose}>
                                    <Favorite sx={{ marginRight: 1 }} />
                                    My Favorites
                                </MenuItem>
                            )}

                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;