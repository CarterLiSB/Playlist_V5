import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    let text ="";
    let idName = "playlister-statusbar-hidden";
    if (store.currentList){
        text = store.currentList.name;
        idName = "playlister-statusbar";
    }    
    else
        idName = "playlister-statusbar-hidden";
    return (
        <div id= {idName}>
            <Typography variant="h4">{text}</Typography>
        </div>
    );
}

export default Statusbar;