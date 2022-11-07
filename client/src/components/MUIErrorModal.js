import { useContext } from 'react'
import AuthContext from '../auth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUILoginModal() {
    const { auth } = useContext(AuthContext);
    function handleCloseModal(){
        auth.hideModals();
    }

    return (
        <Modal
            open={auth.user === null}
        >
            <Box sx={style}>
                <Alert severity = "warning">
                    <AlertTitle>Error</AlertTitle>
                    <header className="dialog-header">
                        {auth.errMsg}
                    </header>
                    <div id="confirm-cancel-container">
                        <button
                            id="dialog-yes-button"
                            className="modal-button"
                            onClick={handleCloseModal}
                        >Close</button>
                    </div>
                </Alert>
            </Box>
        </Modal>
    );
}