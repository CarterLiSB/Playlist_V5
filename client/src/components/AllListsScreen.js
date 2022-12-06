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

export default function AllListsScreen() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleSort(order) {
        
    }
    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
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




}