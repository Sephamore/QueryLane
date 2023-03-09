import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export default function InputDialog({ onChange, onSubmit, onCancel, ...props }) {
  return (
    <div>
      <Dialog {...props}>
        <DialogTitle >Type below</DialogTitle>
        <DialogContent >
            {/* <Box width="40ch" minHeight={100}> */}
                <TextField width="40ch" onChange={onChange} multiline/>
            {/* </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onSubmit}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}