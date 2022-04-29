import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import CreateIcon from '@mui/icons-material/Create';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import '../styles/NavBar.css'

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState(true);
    const [userName, setUserName] = useState("Nick");
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let navigate = useNavigate();
    const location = useLocation();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUserName("");
        setAnchorElUser(null);
        if (location.pathname === "/ReviewForm") {
            navigate("/", { replace: true });
        }
    };

    return(
        <AppBar position="static" style={{ backgroundColor: "black", width: "100%", margin: "0" }}>
            <Toolbar disableGutters style={{ marginLeft: "20px" }}>
                <Typography 
                    id="stamp-text" 
                    variant="h6" 
                    noWrap 
                    component="div" 
                    fontFamily="Georgia" 
                    mr={4} 
                    fontSize={26}>
                        SMDB
                </Typography>
                <Divider orientation="vertical" flexItem color="white" variant="middle" />
                <Box sx={{ flexGrow: 1 }}>
                    <Tooltip title="Home" placement="bottom-end">
                        <Link to="/">
                            <IconButton className="icon-button">
                                <HomeIcon className="icon" />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    { 
                        loggedIn ?
                            <Tooltip title="Write Review" placement="bottom-end">
                                <Link to="/ReviewForm">
                                    <IconButton className="icon-button">
                                        <CreateIcon className="icon" />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        :
                            <div></div>
                    }
                </Box>
                {
                    loggedIn ? 
                        <div id="user-display" className="user-option">
                            {userName}
                            <IconButton className="icon-button" onClick={handleOpenUserMenu}>
                                <ArrowDropDownIcon className="icon" />
                            </IconButton>
                            <Menu sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                keepMounted
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    : 
                    <Link to="/Login">
                        <button id="user-button" className="user-option">Log In</button>
                    </Link>
                }
            </Toolbar>
        </AppBar>
    );
}