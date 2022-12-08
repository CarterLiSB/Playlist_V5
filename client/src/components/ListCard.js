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
import MUIRemoveSongModal from './MUIRemoveSongModal';
import MUIEditSongModal from './MUIEditSongModal';

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

    const [likes, setLikes] = useState(-1)
    const [dislikes, setDislikes] = useState(-1)

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
        event.stopPropagation();
        store.likePlaylist(id, handleLikeCallback);
    }

    const handleLikeCallback = (returnedLikes) => {
        setLikes(returnedLikes)
    }

    const handleDislikeCallback = (returnedDislikes) => {
        setDislikes(returnedDislikes)
    }

    function handleDislike(event, id) {
        event.stopPropagation();
        store.dislikePlaylist(id, handleDislikeCallback);
    }

    function handleDuplicate(event, id) {
        store.duplicateList(id);
    }

    function handlePublish(event, id) {
        store.publishCurrentList(id);
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

    function handleSelectList(event, id) {
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);
            store.setSelectedList(id);
        }
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
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
    let highlight;
    let publishHighlight;
    let listens = 0;
    let publishDate = "";
    if(idNamePair.published){
        listens = idNamePair.listens;
        highlight = {backgroundColor: "grey"}
        if(idNamePair.updatedAt){
            publishDate = idNamePair.updatedAt;
        }
    }else{
        highlight = {backgroundColor: "lightgrey"} 
        publishDate = "Not yet published!"
    }
    if(store.selectedList !== null && store.selectedList._id === idNamePair._id){
        highlight = {backgroundColor: "red"}
    }else{
        if(!idNamePair.published){
            highlight = {backgroundColor: "lightgrey"}
        }
    }
    
    
    if(store.currentList !== null && store.currentList._id === idNamePair._id){
        cardElement =
        <Box style = {highlight}>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex' }}
                style={{width: '100%', fontSize: '24pt'}}
                button
                onClick={(event) => {
                    handleSelectList(event, idNamePair._id)
                }}
            >
                <Box style={{ p: 1, flexGrow: 1, fontSize: '16pt'}}>{idNamePair.name} by: {}</Box>
                <Box style={{ p: 1, fontSize: '8pt' }}>
                    Publish Date: {publishDate}
                    <br/>
                    Listens: {listens}
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton disabled = {!idNamePair.published} onClick={(e) => handleLike(e, idNamePair._id)}>
                        <ThumbUpRoundedIcon style={{fontSize:'20pt'}} /> {likes > -1 ? likes : idNamePair.likes}
                    </IconButton>
                    <IconButton disabled = {!idNamePair.published} onClick={(e) => handleDislike(e, idNamePair._id)}>
                        <ThumbDownRoundedIcon style={{fontSize:'20pt'}} /> {dislikes > -1 ? dislikes : idNamePair.dislikes}
                    </IconButton>
                    <IconButton disabled = {idNamePair.published} onClick={(event) => {handleEdit(event)}}>
                        <EditRoundedIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                    <IconButton onClick={(event) => {handleContract(event)}}>
                        <ExpandLessRoundedIcon style={{fontSize:'20pt'}} />
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
            { modalJSX }
            <Button disabled = {!store.canUndo() || store.currentList.published} onClick={(event) => {handleUndo()}}>
                Undo
            </Button>
            <Button disabled = {!store.canRedo() || store.currentList.published} onClick={(event) => {handleRedo()}}>
                Redo
            </Button>
            <Button disabled = {!store.canAddNewSong() || store.currentList.published} onClick={(event) => {handleAdd()}}>
                Add
            </Button>
            <Button disabled = {store.currentList.published} onClick={(event) => {handlePublish(event, idNamePair._id)}}>
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
        <Box style = {highlight}>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex' }}
                style={{width: '100%', fontSize: '24pt'}}
                button
                onClick={(event) => {
                    handleSelectList(event, idNamePair._id)
                }}
            >
                <Box style={{ p: 1, flexGrow: 1, fontSize: '16pt'}}>{idNamePair.name} by: {}</Box>
                <Box style={{ p: 1, fontSize: '8pt' }}>
                    Publish Date: {publishDate}
                    <br/>
                    Listens: {listens}
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton disabled = {!idNamePair.published} onClick={(e) => handleLike(e, idNamePair._id)}>
                        <ThumbUpRoundedIcon style={{fontSize:'20pt'}} /> {likes > -1 ? likes : idNamePair.likes}
                    </IconButton>
                    <IconButton disabled = {!idNamePair.published} onClick={(e) => handleDislike(e, idNamePair._id)}>
                        <ThumbDownRoundedIcon style={{fontSize:'20pt'}} /> {dislikes > -1 ? dislikes : idNamePair.dislikes}
                    </IconButton>
                    <IconButton disabled = {idNamePair.published} onClick={(event) => {handleEdit(event)}}>
                        <EditRoundedIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                    <IconButton onClick={(event) => {handleExpand(event, idNamePair._id)}}>
                        <ExpandMoreRoundedIcon style={{fontSize:'20pt'}} />
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