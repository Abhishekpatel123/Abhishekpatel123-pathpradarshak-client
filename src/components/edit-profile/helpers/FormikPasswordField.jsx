import { Field, useField } from "formik";
import { at } from "lodash";
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useStyles } from "./CustomizedCustomStyles";
import { ReactComponent as Visibility } from "../../../assets/images/visibility.svg";
import { ReactComponent as VisibilityOff } from "../../../assets/images/visibilityOff.svg";

export const ProfilePasswordField = (props) => {
  const {
    label,
    value,
    name,
    type,
    placeholder,
    onChange,
    style,
    icon,
    showPassword,
    setShowPassword,
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

  const handleClickShowPassword = () => {
    setShowPassword(true);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword(false);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Typography variant="body2" className={classes.inputLabel}>
        {label}
      </Typography>
      <Field
        type={showPassword ? "text" : "password"}
        variant="outlined"
        color="primary"
        as={OutlinedInput}
        label={label}
        name={name}
        id={label}
        placeholder={placeholder || label}
        classes={{ root: classes.inputPassword }}
        inputProps={{
          className: classes.inputFont,
        }}
        InputProps={{ classes: { notchedOutline: classes.noBorder } }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{ padding: 0, margin: 0 }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...field}
        {...rest}
      />
      {renderHelperText()}
    </FormControl>
  );
};

export const ProfilePasswordFieldForNew = (props) => {
  const {
    label,
    value,
    name,
    type,
    placeholder,
    onChange,
    style,
    icon,
    newPasswordVisible,
    setNewPasswordVisible,
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

  const handleNewPasswordVisible = () => {
    setNewPasswordVisible(true);
  };

  const handleHideNewPassword = (event) => {
    event.preventDefault();
    setNewPasswordVisible(false);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Typography variant="body2" className={classes.inputLabel}>
        {label}
      </Typography>
      <Field
        type={newPasswordVisible ? "text" : "password"}
        variant="outlined"
        color="primary"
        as={OutlinedInput}
        label={label}
        name={name}
        id={label}
        placeholder={placeholder || label}
        classes={{ root: classes.inputPassword }}
        inputProps={{
          className: classes.inputFont,
        }}
        InputProps={{ classes: { notchedOutline: classes.noBorder } }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleNewPasswordVisible}
              onMouseDown={handleHideNewPassword}
              style={{ padding: 0, margin: 0 }}
              edge="end"
            >
              {newPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...field}
        {...rest}
      />
      {renderHelperText()}
    </FormControl>
  );
};
