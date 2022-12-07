import React from 'react';
import YouTube from 'react-youtube';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import { Card, CardContent } from '@mui/material'

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    const [ index, setIndex ] = useState(0);
    const { store } = useContext(GlobalStoreContext);
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [

    ];
    let titles = [];
    let artists = [];
    let ids = [];
    let listLength = -1;
    let player;

    let displayPlaylist = "";
    let displayTitle = "";
    let displayArtist = "";
    let displayIndex = 0;

    let song = "";

    if(store.selectedList){
        displayPlaylist = store.selectedList.name;
        listLength = store.selectedList.songs.length;
        if(listLength > 0){
            for(let i = 0; i < listLength; i++){
                titles[i] = store.selectedList.songs[i].title;
                artists[i] = store.selectedList.songs[i].artist;
                ids[i] = store.selectedList.songs[i].youTubeId;
            }
            displayIndex = index + 1;
            displayTitle = store.selectedList.songs[index].title;
            displayArtist = store.selectedList.songs[index].artist;
        }
    }

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        if(index < listLength){
            song = ids[index];
        }
        player.loadVideoById(song);
        player.playVideo();
        console.log(song);
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        setIndex(index + 1);
    }

    function decSong() {
        setIndex(index - 1);
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        player = event.target;

    }

    function handleRewind(){
        decSong();
    }

    function handlePause(){
        player.pauseVideo();
    }

    function handlePlay(){
       player.playVideo();
    }
    function handleSkip(){
        incSong();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    if(ids[index]){
        return (
            <div>
                <YouTube
                    videoId={ids[index]}
                    opts={playerOptions}
                    onReady={onPlayerReady}
                    onStateChange={onPlayerStateChange} />
                <Card sx = {{width: "86%", bgcolor: "white"}}>
                    <CardContent>
                        <div>Now Playing</div>
                        <div>Playlist: {displayPlaylist}</div>
                        <div>Song #: {displayIndex}</div>
                        <div>Title: {displayTitle}</div>
                        <div>Artist: {displayArtist}</div>
                    </CardContent>
                </Card>
                <br></br>
                <Box id = "YT-controller" sx = {{width: "86%", bgcolor: "lightgrey", borderRadius: "25px"}}>
                    <IconButton onClick = {handleRewind}><FastRewindRoundedIcon sx = {{color: "black", fontSize: 24}}></FastRewindRoundedIcon></IconButton>
                    <IconButton onClick = {handlePause}><PauseRoundedIcon sx = {{color: "black", fontSize: 24}}></PauseRoundedIcon></IconButton>
                    <IconButton onClick = {handlePlay}><PlayArrowRoundedIcon sx = {{color: "black", fontSize: 24}}></PlayArrowRoundedIcon></IconButton>
                    <IconButton onClick = {handleSkip}><FastForwardRoundedIcon sx = {{color: "black", fontSize: 24}}></FastForwardRoundedIcon></IconButton>
                </Box>
            </div>
        )
    }else{
        return (
            <div>
                <Card sx = {{width: "86%", bgcolor: "white"}}>
                    <CardContent>
                        <div>Nothing playing!</div>
                    </CardContent>
                </Card>
                <br></br>
                <Box id = "YT-controller" sx = {{width: "86%", bgcolor: "lightgrey", borderRadius: "25px"}}>
                    <IconButton onClick = {handleRewind}><FastRewindRoundedIcon sx = {{color: "black", fontSize: 24}}></FastRewindRoundedIcon></IconButton>
                    <IconButton onClick = {handlePause}><PauseRoundedIcon sx = {{color: "black", fontSize: 24}}></PauseRoundedIcon></IconButton>
                    <IconButton onClick = {handlePlay}><PlayArrowRoundedIcon sx = {{color: "black", fontSize: 24}}></PlayArrowRoundedIcon></IconButton>
                    <IconButton onClick = {handleSkip}><FastForwardRoundedIcon sx = {{color: "black", fontSize: 24}}></FastForwardRoundedIcon></IconButton>
                </Box>
            </div>
        )
    }
}