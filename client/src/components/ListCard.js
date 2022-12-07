import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { Button } from '@mui/material';
import { List } from '@mui/material';
import SongCard from './SongCard';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const { song, index } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleExpand(event, id) {
        event.stopPropagation();
        //store.setCurrentList(idNamePair._id);
        setIsExpanded(true);
        handleLoadList(event, id)
    }

    function handleContract(event) {
        event.stopPropagation();
        setIsExpanded(false);
        store.closeCurrentList();
    }

    function handleLike(event, id) {
        //store.
    }

    function handleDislike(event, id) {
        //store.
    }

    function handleDuplicate(event, id) {
        //
    }

    function handlePublish(event, id) {
        //
    }

    function handleUndo() {
        store.undo();
    }

    function handleRedo() {
        store.redo();
    }

    function handleAdd() {
        store.addNewSong();
    }

    function handleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

//     <div
//     id={'song-' + index + '-card'}
// >
//     {index + 1}.
//     <a
//         id={'song-' + index + '-link'}
//         className="song-link"
//         href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
//         {song.title} by {song.artist}
//     </a>

    let cardElement;
    if(store.currentList !== null && store.currentList._id === idNamePair._id){
        cardElement =
        <Box>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex' }}
                style={{width: '100%', fontSize: '24pt'}}
            >
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name} by: </Box>
                <Box sx={{ p: 1 }}>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleLike}>
                        <ThumbUpRoundedIcon style={{fontSize:'24pt'}} />0
                    </IconButton>
                    <IconButton onClick={handleDislike}>
                        <ThumbDownRoundedIcon style={{fontSize:'24pt'}} />0
                    </IconButton>
                    <IconButton onClick={(event) => {handleEdit(event)}}>
                        <EditRoundedIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <IconButton onClick={(event) => {handleContract(event)}}>
                        <ExpandLessRoundedIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                </Box>
            </ListItem>
            <List>
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
            </List>
            <Button onClick={(event) => {handleUndo()}}>
                Undo
            </Button>
            <Button onClick={(event) => {handleRedo()}}>
                Redo
            </Button>
            <Button onClick={(event) => {handleAdd()}}>
                Add
            </Button>
            <Button onClick={(event) => {handlePublish(event, idNamePair._id)}}>
                Publish
            </Button>
            <Button onClick={(event) => {handleDeleteList(event, idNamePair._id)}}>
                Delete
            </Button>
            <Button onClick={(event) => {handleDuplicate(event, idNamePair._id)}}>
                Duplicate
            </Button>
        </Box>    
    }else{
        cardElement =
        <Box>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex' }}
                style={{width: '100%', fontSize: '24pt'}}
                // onClick={(event) => {
                //     handleLoadList(event, idNamePair._id)
                // }}
            >
                <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name} by: </Box>
                <Box sx={{ p: 1 }}>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleLike}>
                        <ThumbUpRoundedIcon style={{fontSize:'24pt'}} />0
                    </IconButton>
                    <IconButton onClick={handleDislike}>
                        <ThumbDownRoundedIcon style={{fontSize:'24pt'}} />0
                    </IconButton>
                    <IconButton onClick={(event) => {handleEdit(event)}}>
                        <EditRoundedIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                    <IconButton onClick={(event) => {handleExpand(event, idNamePair._id)}}>
                        <ExpandMoreRoundedIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                </Box>
            </ListItem>
        </Box>    
    }
    
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;