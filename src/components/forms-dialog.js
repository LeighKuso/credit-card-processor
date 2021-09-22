import React from 'react';
// amterial-UI imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormsDialog({ title, children, isOpen, handleClose }) {
    return (
        <Dialog
            maxWidth='md'
            open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent >
                {children}
            </DialogContent>
            <DialogActions >
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
