import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  ProfilePasswordField,
  ProfilePasswordFieldForNew,
} from "../../components/edit-profile/helpers/FormikPasswordField";
import { Typography, Container } from "@mui/material";
import useStyle from "../../assets/style/globalStyle";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import allRoutes from "../../../../data/routes";
// import authValidate from "../../../../pages/auth/authValidate";
import catchError from "../../utils/catchError";
import { useHistory, useParams } from "react-router-dom";
import ServerService from "../../api";
// import { AuthContext } from "../../../../Context/AuthContext";
// import ServerService from "../../../../apis/common";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../store/features/global";

const CustomDialog = (props) => {
  const params = useParams();
  const history = useHistory();
  const classes = useStyle();
  const { openDialog, handleCloseDialog, user } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  // const { setAlertData } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const initialValues = {
    repeatPassword: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("*Please Enter your old Password"),
    repeatPassword: Yup.string()
      .required("*Please Enter your New Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    console.log(params);
    const data = {
      password: values.password,
      token: params.token,
    };

    ServerService.changePassword2(data)
      .then((result) => {
        dispatch(
          setSnackbar({
            open: true,
            message: "Successfully changed password!",
            type: "success",
          })
        );
        setSubmitting(true);
        history.push("/login")
      })
      .catch((err) => catchError(err, dispatch, setSnackbar));
  };

  return (
    <Container sx={{ mt: 10 }} maxWidth="md">
      <Typography style={{ color: "black" }} className={classes.Typography1}>
        Change Password
      </Typography>
      <Typography style={{ color: "#263238" }} className={classes.Typography2}>
        Performing this action might log you out of all your devices, and you
        may need to login with the new password again.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <ProfilePasswordField
              label="Password"
              name="password"
              type="password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <ProfilePasswordFieldForNew
              label="Repeat Password"
              name="repeatPassword"
              type="password"
              newPasswordVisible={newPasswordVisible}
              setNewPasswordVisible={setNewPasswordVisible}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              style={{ padding: "10px 0", width: "100%", margin: "10px 0 0" }}
              fullWidth
            >
              <Typography className={classes.ButtonTextColor}>
                Save Password
              </Typography>
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CustomDialog;
