import { makeStyles, withStyles } from "@mui/styles";
import { InputBase } from "@mui/material";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "10px 0",
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
    },
    "& .MuiSelect-outlined": {
      fontSize: "14px",
      fontWeight: "500",
      color: "#a5a5a5",
    },
    "& fieldset": {
      display: "none",
    },
    width: "100%",
  },
  input: {
    "& .MuiOutlinedInput-input": {
      padding: "16.5px 14px",
      fontSize: "14px",
      fontWeight: "500",
    },
    "& .MuiInputLabel-root": {
      fontSize: "15px",
      color: "#a5a5a5",
    },
    background: "#F0F0F0",
    borderRadius: "5px",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  input2: {
    "& .MuiOutlinedInput-input": {
      padding: "10px",
      fontSize: "14px",
      fontWeight: "500",
    },
    "& .MuiInputLabel-root": {
      fontSize: "15px",
    },
    borderRadius: "5px",
    border: "1px solid #D8D8D8",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  inputPassword: {
    "& .MuiOutlinedInput-input": {
      padding: "10px",
      fontSize: "15px",
      fontWeight: "600",
      // letterSpacing: "1px",
    },
    borderRadius: "5px",
    border: "1px solid #D8D8D8",
  },
  margin: {
    margin: theme.spacing(1, 0),
  },
  descriptionText: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "21px",
    display: "flex",
    flexDirection: "flex-start",
    padding: "15px 0px 0px 20px",
    ["@media (max-width:1210px)"]: {
      fontSize: "12px",
    },
  },
  Field: {
    width: "100%",
  },
  optionalText: {
    fontSize: "15px",
    color: "#a5a5a5",
  },
  inputLabel: {
    fontWeight: "500",
    margin: "0px 2px 10px",
    color: "#000",
  },
  formErrorMessage: {
    marginLeft: "5px",
    marginTop: "5px",
    fontSize: "12px",
    fontWeight: 600,
    color: "red",
    lineHeight: 1,
    letterSpacing: "0.4px",
    fontFamily: "Montserrat, sans-serif",
  },
}));

//themed Custom input Fields
export const InputForField = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#f3f1f1",
    fontSize: 16,
    padding: "14.5px 14px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
    },
  },
}))(InputBase);

export const InputForFieldOutlined = withStyles((theme) => ({
  input: {
    borderRadius: 5,
    fontSize: 15,
    padding: "9px",
    border: "1px solid #D8D8D8",
    backgroundColor: "#fff",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 5,
      backgroundColor: "#fff",
    },
  },
}))(InputBase);
