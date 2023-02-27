import { useField } from "formik";
import { at } from "lodash";
import {
  FormControl,
  FormHelperText,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import {
  useStyles,
  InputForFieldOutlined,
} from "./CustomizedCustomStyles";

export const ProfileSelectField = (props) => {
  const {
    label,
    data,
    description,
    style,
    mappingProp,
    optionalText,
    name,
    ...rest
  } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;
  console.log(selectedValue, "fksdfls");
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
      <Typography variant="body2" className={classes.inputLabel}>
        {label}
      </Typography>
      <Select
        name={name}
        input={<InputForFieldOutlined />}
        className={classes.Field}
        value={"India"}
        {...field}
        {...rest}
      >
        <MenuItem disabled value="">
          {optionalText}
        </MenuItem>
        {data.map((item, index) => (
          <MenuItem
            key={index}
            value={item.label}
            style={{ fontSize: "15px", color: "#a5a5a5" }}
          >
            {item.value}
          </MenuItem>
        ))}
      </Select>
      {renderHelperText()}
    </FormControl>
  );
};
