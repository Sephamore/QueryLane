import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactRTE from './reactRTE';

export default function RichTextDialog({ setResult, onChange, onSubmit, onCancel, ...props }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog {...props}>
        <DialogTitle >Write below</DialogTitle>
        <DialogContent>
          <ReactRTE
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={(e) => {
            onSubmit(e);
          }}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}