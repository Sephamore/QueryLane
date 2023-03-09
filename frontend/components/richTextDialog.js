import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { withStyles } from '@mui/styles';
import DialogTitle from '@mui/material/DialogTitle';
import RTE from './RTE';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backend } from '@/query.config';

const styles = {
  dialogPaper: {
      minHeight: '80vh',
      maxHeight: '80vh',
  },
};

function RichTextDialog({ classes, onChange, onSubmit, onCancel, onTagSelect, showTagSelector, ...props }) {
  const [ allTags, setAllTags ] = useState([])

  useEffect(() => {
      const getTags = async () => {
        try {
          const res = await axios.get(`${backend}/tags/get`)
          const data = res.data.map((tag) => {
            return {
              name: tag.tag_name,
              id: tag.id.toString(),
              type: "tag"
            }
          })
          setAllTags(data);
        } catch (e) {
          console.log(e)
        }
      }
      if (allTags.length == 0)
          getTags();
  })


  return (
    <div>
      <Dialog {...props}
        classes={{ paper: classes.dialogPaper }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle >Type below</DialogTitle>
        <DialogContent>
          <RTE
            onChange={onChange}
            {...props}
          />
          {
            showTagSelector &&
            <Autocomplete
              multiple
              getOptionLabel={(option) => (option.name)}
              options={allTags}
              renderInput={(params) => <TextField {...params} label="Choose tags" />}
              onChange={(_, value) => {
                  onTagSelect(value.map(tag => `<${tag.name}>`).join(""));
              }}
              sx={{ mt: 1.5 }}
            />
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onSubmit}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(RichTextDialog);
