import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar"
import { useState } from "react";
import React from "react";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material"


export default function InfoSnackBar({ open, setOpen, message }) {

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {setOpen(false)}}
          >
            <Close fontSize="small" />
          </IconButton>
        </React.Fragment>
      );


    return (
        <Box>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={() => {setOpen(false)}}
                message={message}
                action={action}
            />
        </Box>
    )
}
