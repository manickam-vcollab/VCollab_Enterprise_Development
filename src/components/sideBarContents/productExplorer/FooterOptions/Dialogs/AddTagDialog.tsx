import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props:any) {
  const [input, setInput] = useState("");
  return (
    <div>
      <Dialog disablePortal={true} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a tag name to the selected Nodes. 
            This tag name can be used in search to filter nodes
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag Name"
            value = {input}
            onChange = {(e) => setInput(e.target.value)}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {props.handleSave(input); setInput('');}} color="primary">
            Add
          </Button>
          <Button onClick={() => {props.handleClose(); setInput('');}} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}