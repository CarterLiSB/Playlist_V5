import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';

export default function AllListsScreen() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleHome() {
        history.push("/homescreen/");
    }

    function handlePublic() {
        history.push("/alllistsscreen/");
    }

    function handleUser() {
        history.push("/userscreen/");
    }

    function handleSort(order) {
        
        //to do
        handleMenuClose();
    }

    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem id = "sort-menu" onClick = {handleSort("name")}>Name (A - Z)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSort("date")}>Publish Date (Newest)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSort("listens")}>Listens (High - Low)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSort("likes")}>Likes (High - Low)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSort("dislikes")}>Dislikes (High - Low)</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar id = "nav-toolbar">
                <Toolbar>
                    <IconButton disabled = {!auth.loggedIn} onClick = {handleHome}><HomeRoundedIcon sx = {{color: "white", fontSize: 36}}></HomeRoundedIcon></IconButton>
                    <IconButton onClick = {handlePublic}><GroupsRoundedIcon sx = {{color: "white", fontSize: 36}}></GroupsRoundedIcon></IconButton>
                    <IconButton onClick = {handleUser}><PersonRoundedIcon sx = {{color: "white", fontSize: 36}}></PersonRoundedIcon></IconButton>
                    <TextField
                        variant = "outlined"
                        size = "small"
                        label = "Search"
                        sx = {{borderRadius: 2, width: 650, bgcolor: "white"}}
                    ></TextField>
                    <IconButton><SortRoundedIcon sx = {{color: "white", fontSize: 36}}></SortRoundedIcon></IconButton>
                </Toolbar>
                { sortMenu }
            </AppBar>
        </Box>
    );
    
}