import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

//import the component
const RichTextEditor = dynamic(() => import("react-rte"), { ssr: false });

const RTE = ({ onChange }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    const importModule = async () => {
      //import module on the client-side to get `createEmptyValue` instead of a component
      const module = await import("react-rte");
      setValue(module.createEmptyValue());
    };
    importModule();
  }, []);

  const handleOnChange = (value) => {
    setValue(value);
    if (onChange) {
      onChange(value.toString("html"));
    }
  };

  return (
    <Box>
        <RichTextEditor value={value} onChange={handleOnChange} />
        
    </Box>
  )
};

ReactRTE.propTypes = {
  onChange: PropTypes.func
};

export default ReactRTE;