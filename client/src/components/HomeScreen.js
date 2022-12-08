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
import CommentScreen from './CommentScreen';

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
import { Button } from '@mui/material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [onYTScreen, setonYTScreen] = useState(true);
    const [text, setText] = useState("");
    const isMenuOpen = Boolean(anchorEl);
    let history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

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

    function handlePlayer() {
        setonYTScreen(true);
        console.log("Player!")
    }

    function handleComment() {
        setonYTScreen(false);
        console.log("Comments!")
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            console.log(text);
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleSortName(){
        setAnchorEl(null);
        store.sortByName();
    }

    function handleSortDate(){
        setAnchorEl(null);
        store.sortByDate();
    }

    function handleSortListens(){
        setAnchorEl(null);
        store.sortByListens();
    }

    function handleSortLikes(){
        setAnchorEl(null);
        store.sortByLikes();
    }

    function handleSortDislikes(){
        setAnchorEl(null);
        store.sortByDislikes();
    }

    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem id = "sort-menu" onClick = {handleSortName}>Name (A - Z)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSortDate}>Publish Date (Newest)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSortListens}>Listens (High - Low)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSortLikes}>Likes (High - Low)</MenuItem>
            <MenuItem id = "sort-menu" onClick = {handleSortDislikes}>Dislikes (High - Low)</MenuItem>
        </Menu>
    );

    return (
        <Grid container>
            <Grid item xs = {12}>
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
                                onKeyPress={handleKeyPress}
                                onChange={handleUpdateText}
                                sx = {{borderRadius: 2, width: 650, bgcolor: "white"}}
                            ></TextField>
                            <IconButton onClick = {handleMenuOpen}><SortRoundedIcon sx = {{color: "white", fontSize: 36}}></SortRoundedIcon></IconButton>
                        </Toolbar>
                        { sortMenu }
                    </AppBar>
                </Box>
            </Grid>
            <Grid item xs = {6}>
                <div style = {{overflowY: 'scroll', maxHeight:'85%'}}>
                    { listCard }
                    <MUIDeleteModal></MUIDeleteModal>
                </div>
            </Grid>
            <Grid item xs = {6} >
                <Button onClick = {handlePlayer}>Player</Button>
                <Button onClick = {handleComment}>Comments</Button>
                {onYTScreen? <YouTubePlayerExample/>: <CommentScreen/>}
            </Grid>
            <Grid item xs = {12}>
                <div id = "new-list-button">
                    <IconButton onClick = {handleCreateNewList}><AddCircleRoundedIcon sx = {{color: "white", fontSize: 36}}></AddCircleRoundedIcon></IconButton>
                    Your Lists
                </div>
            </Grid>
        </Grid>
    )
}

export default HomeScreen;