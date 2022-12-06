import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <Typography id = "splash-screen-welcome">Welcome to...</Typography>
            <Typography id = "splash-screen-playlister">Playlister</Typography>
            <Typography id = "splash-screen-credits">Created by Carter Li</Typography>
            <Typography id = "splash-screen-blurb">Welcome to my Playlister site! Here, you can create your own custom playlists consisting of YouTube videos, as well as share said playlists with other users!</Typography>
            <img src = "images/Example.png" id = "splash-screen-image"></img>
            <MenuItem id = "splash-screen-button1"><Link to='/login/' style={{ textDecoration: 'none', fontColor: "black" }}>Login</Link></MenuItem>
            <MenuItem id = "splash-screen-button2"><Link to='/register/' style={{ textDecoration: 'none', fontColor: "black" }}>Create New Account</Link></MenuItem>
            <MenuItem id = "splash-screen-button3"><Link to='/alllistsscreen/' style={{ textDecoration: 'none', fontColor: "black" }}>Continue as Guest</Link></MenuItem>
        </div>
        
    )
}