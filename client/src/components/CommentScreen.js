import React, { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import AuthContext from '../auth';
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'

import YouTubePlayerExample from './YTPlayer';

import { Grid, Tabs, Tab } from '@mui/material'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { TextField } from '@mui/material'
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export default function CommentScreen() {
    function handleKeyPress(){
        
    }

    return (
        <div id = "comment-screen">
            <div id = 'comment-cards'>
                
            </div>
            <TextField
                variant = "outlined"
                size = "small"
                label = "Add Comment"
                sx = {{borderRadius: 2, width: 650, bgcolor: "white"}}
            ></TextField>
        </div>    
    )

}