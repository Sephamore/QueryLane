import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

//import the component
// const RichTextEditor = dynamic(() => import("react-rte"), { ssr: false });
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const RTE = ({ onChange, ...props }) => {
  // const [value, setValue] = useState();

  return (
    <Box>
        {/* <RichTextEditor value={value} onChange={handleOnChange} /> */}
        <SunEditor onChange={(e) => {
          // console.log(e)
          onChange(e)
        }} {...props}
        height="50ch"
        autoFocus
        
        />
    </Box>
  )
};

export default RTE;