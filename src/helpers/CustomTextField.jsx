import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

const CustomTextField = ({ name, type, label, ...rest }) => {
  const { getFieldProps, touched, errors } = useFormikContext();
  //   const [error, setError] = useState(false);
  //   useEffect(() => {
  //     let fieldTouched = touched;
  //     let fieldErrors = errors;
  //     if (Object.keys(touched).length > 0) {
  //       if (name.includes(".")) {
  //         name.split(".").forEach((name) => {
  //           if (fieldTouched[name]) fieldTouched = fieldTouched[name];
  //           if (fieldErrors[name]) fieldErrors = fieldErrors[name];
  //         });
  //       } else {
  //         if (fieldTouched[name]) fieldTouched = fieldTouched[name];
  //         if (fieldErrors[name]) fieldErrors = fieldErrors[name];
  //       }
  //     }
  //     setError(Boolean(fieldErrors && fieldTouched));
  //   }, [touched, errors, name]);

  return (
    <TextField
      name={name}
      fullWidth
      type={type}
      label={label}
      {...getFieldProps(name)}
      {...rest}
    />
  );
};

export default CustomTextField;
