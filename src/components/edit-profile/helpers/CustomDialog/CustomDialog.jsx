import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  ProfilePasswordField,
  ProfilePasswordFieldForNew,
} from "../FormikPasswordField";
import { Typography } from "@mui/material";
import useStyle from "../../../../assets/style/globalStyle";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import allRoutes from "../../../../data/routes";
// import authValidate from "../../../../pages/auth/authValidate";
import catchError from "../../../../utils/catchError";
import { useHistory, useParams } from "react-router-dom";
import ServerService from "../../../../api";
// import { AuthContext } from "../../../../Context/AuthContext";
// import ServerService from "../../../../apis/common";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../../store/features/global";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    newPassword: "",
    oldPassword: "",
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("*Please Enter your old Password"),
    newPassword: Yup.string().required("*Please Enter your New Password"),
  });

  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    console.log("clicked submitted");
    const data = {
      email: user?.email,
      ...values,
    };

    ServerService.changePassword(data)
      .then((result) => {
        dispatch(
          setSnackbar({
            open: true,
            message: "Successfully changed password!",
            type: "success",
          })
        );
      })
      .catch((err) => catchError(err, dispatch, setSnackbar));
  };

  return (
    <Dialog
      open={openDialog}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
      TransitionComponent={Transition}
      classes={{ root: classes.dialogBox }}
      keepMounted
      onClose={handleCloseDialog}
      aria-labelledby="Password-Change-Dialog"
    >
      <DialogTitle id="change-password" style={{ paddingTop: "20px" }}>
        <Typography style={{ color: "black" }} className={classes.Typography1}>
          Change Password
        </Typography>
        <Typography
          style={{ color: "#263238" }}
          className={classes.Typography2}
        >
          Performing this action might log you out of all your devices, and you
          may need to login with the new password again.
        </Typography>
      </DialogTitle>
      <DialogContent suppressContentEditableWarning={true}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <ProfilePasswordField
                label="Old Password"
                name="oldPassword"
                type="password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <ProfilePasswordFieldForNew
                label="New Password"
                name="newPassword"
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
              <Button
                disableRipple
                className={classes.buttonText}
                onClick={handleCloseDialog}
                style={{
                  color: "#FF2F2F",
                  marginTop: "15px",
                  textDecoration: "none",
                  paddingTop: "0",
                  marginLeft: "40%",
                }}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
