import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import katex from 'katex'
import 'katex/dist/katex.min.css'

//import the component
// const RichTextEditor = dynamic(() => import("react-rte"), { ssr: false });
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const RTE = ({ onChange, ...props }) => {
  // const [value, setValue] = useState();

  return (
    <Box minHeight="100%" style={{ backgroundColor:"blue" }}>
        {/* <RichTextEditor value={value} onChange={handleOnChange} /> */}
        <SunEditor onChange={(e) => {
          // console.log(e)
          onChange(e)
          }}
          {...props}
          height="100%"
          width="100%"
          autoFocus
          setOptions={{
            buttonList: [['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
            ['fontColor', 'hiliteColor', 'textStyle'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['table', 'link', 'image', 'video', 'audio', 'math'],
            ['imageGallery'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview', 'print'],
            ['save',],
            ['-left', '#fix', 'dir_ltr', 'dir_rtl'],
          ],
            katex: katex
          }}
        />
    </Box>
  )
};

export default RTE;