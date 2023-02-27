import { Field, useField } from "formik";
import { at } from "lodash";
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useStyles } from "./CustomizedCustomStyles";

export const ProfileTextField = (props) => {
  const {
    label,
    value,
    name,
    type,
    placeholder,
    onChange,
    style,
    disabled,
    ...rest
  } = props;
  const [field, meta] = useField(props);
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  function renderHelperText() {
    if (isError) {
      return (
        <FormHelperText className={classes.formErrorMessage}>
          {error}
        </FormHelperText>
      );
    }
  }
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Typography
        variant="body2"
        className={classes.inputLabel}
        // style={disabled ? { color: "#a5a5a5" } : { color: "#000" }}
      >
        {label}
      </Typography>
      <Field
        type={type}
        as={OutlinedInput}
        label={label}
        disabled={disabled}
        name={name}
        id={label}
        value={value}
        placeholder={placeholder || label}
        classes={{ root: classes.input2 }}
        inputProps={{
          className: classes.inputFont,
        }}
        InputProps={{ classes: { notchedOutline: classes.noBorder } }}
        {...field}
      />
      {renderHelperText()}
    </FormControl>
  );
};
