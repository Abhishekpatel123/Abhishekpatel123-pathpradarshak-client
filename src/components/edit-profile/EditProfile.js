import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useTheme } from "@mui/styles";
import {
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  // CircularProgress,
} from "@mui/material";

import catchError from "../../utils/catchError";
// import CompanyNavbar from "../../Components/Navbar new/CompanyNavbar";
// import allRoutes from "../../data/routes";
import { ReactComponent as Back } from "../../assets/images/Back.svg";
import useStyle from "../../assets/style/globalStyle";
import ServerService from "../../api";
// import Company from "../../apis/company";
// import { AuthContext } from "../../Context/AuthContext";
import { ProfileSelectField } from "./helpers/FormikSelectField";
import { ProfileTextField } from "./helpers/FormikOutlinedTextField";
import CustomDialog from "./helpers/CustomDialog/CustomDialog";
import { allCountries, numberOfEmployees } from "./helpers/data";
import Avatar from "./helpers/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../store/features/authSlice";
import setAuthToken from "../../utils/setAuthToken";
import { setSnackbar } from "../../store/features/global";

function CompanyProfile(props) {
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInput = React.createRef();
  const classes = useStyle(props);
  const history = useHistory();
  // const { setAlertData } = useContext(AuthContext);
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const setImage = (image) => {
    setFile(image);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    const imageFile = e.target.files[0];
    reader.onloadend = () => {
      const image = reader.result;
      setImage(image);
      setImagePreviewUrl(image);
    };
    reader.readAsDataURL(imageFile);
  };

  // const handleImageClick = () => {
  //   fileInput.current.click();
  // };
  const handleImageRemove = () => {
    setImage("");
    setImagePreviewUrl(null);
    fileInput.current.value = null;
  };

  ///////////////////////////////////////
  // const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    ServerService.readUserData()
      .then((result) => {
        dispatch(setUser(result.data));
      })
      .catch((error) => {
        catchError(error, dispatch);
      });
  }, []);

  /////////////////////////////////////////

  const initialValues = user
    ? {
        email: `${user?.email || ""}`,
        first_name: `${user?.first_name || ""}`,
        last_name: `${user?.last_name || ""}`,
        designation: `${user?.designation || ""}`,
        contactNumber: `${user?.contactNumber || ""}`,
        country: `${user?.country || ""}`,
      }
    : null;

  const phoneRegexExpression = /^[6789]\d{9}$/;
  // ^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("please enter valid email")
      .required("*Please Enter your email"),
    first_name: Yup.string().required("*Please Enter your first name"),
    last_name: Yup.string().required("*Please Enter your last name"),
    designation: Yup.string()
      .max(50, "Maximum 50 characters allowed")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .required("*Please Enter your Designation"),
    contactNumber: Yup.string()
      .matches(phoneRegexExpression, "Please Enter Valid Phone Number")
      .min(10, "*Please Enter valid contact number")
      .max(12, "*Contact Number must be at most 12 characters")
      .required("*Please Enter your Contact Number"),
    country: Yup.string().required("*Please Select your Country"),
  });

  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    ServerService.updateUser(values, user?._id)
      .then((result) => {
        dispatch(setUser(result.data));
        dispatch(
          setSnackbar({
            type: "success",
            message: "Successfully updated profile ",
            open: true,
          })
        );
      })
      .catch((err) => catchError(err, dispatch));
  };

  const handleSaveAndLogout = async (values, actions) => {
    actions?.setSubmitting(false);
    //Remove token from lc
    localStorage.removeItem("jwtToken");
    //Remove auth header for fututre requests
    setAuthToken(false);
    //set current user to {} which will
    dispatch(logout());
    history.push("/home");
  };

  const handleDeleteAccount = () => {
    console.log(user, "user ");
    ServerService.deleteUser(user?._id)
      .then((respose) => {
        //Remove token from lc
        localStorage.removeItem("jwtToken");
        //Remove auth header for fututre requests
        setAuthToken(false);
        //set current user to {} which will
        dispatch(logout());
        history.push("/home");
      })
      .catch((err) => {});
  };

  return (
    <Grid container className={classes.root}>
      {/* Navbar */}
      {/* <CompanyNavbar /> */}

      <Grid container style={{ margin: "90px 0 0" }}>
        <Grid item xs={1} style={{ paddingLeft: "10px" }}>
          <IconButton
            style={{ transform: "translateY(-8px)" }}
            onClick={() => history.goBack()}
          >
            <Back />
          </IconButton>
        </Grid>

        <Grid item xs={10}>
          {/* //container for items */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                style={{ fontWeight: "600", color: "#000" }}
              >
                Account Settings
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={7} className={classes.gridBox}>
                  <Box className={classes.Box}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      ref={fileInput}
                      style={{
                        display: "none",
                      }}
                    />
                    <Avatar
                      TypoClassName={classes.imageText}
                      ProfileClassName={classes.ProfileImg}
                      ImageClassName={classes.imageClass}
                      // onClick={() => handleImageClick()}
                      src={imagePreviewUrl}
                      name={user?.first_name}
                    />
                    <Box className={classes.DivBox}>
                      <Box>
                        <div className={classes.Box}>
                          <Typography
                            style={{ textTransform: "uppercase" }}
                            className={classes.Typography1}
                          >
                            {user?.first_name + " " + user?.last_name}
                          </Typography>
                        </div>
                        <Typography className={classes.Typography2}>
                          View and edit personal details
                        </Typography>
                      </Box>

                      {/* <Box>
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                          className={classes.button}
                          onClick={() => handleImageClick()}
                        >
                          <Typography className={classes.ButtonTextColor}>
                            Change Photo
                          </Typography>
                        </Button>
                        <Button
                          variant="outlined"
                          disableElevation
                          className={classes.button}
                          style={{
                            border: `1px solid ${theme.palette.primary.main}`,
                          }}
                          onClick={() => handleImageRemove()}
                        >
                          <Typography className={classes.ButtonTextColor}>
                            Remove Photo
                          </Typography>
                        </Button>
                      </Box> */}
                    </Box>
                  </Box>
                </Grid>

                <Grid item md={1}></Grid>

                <Grid item xs={12} md={4} className={classes.gridBox}>
                  <Box>
                    <Typography
                      className={classes.Typography1}
                      style={{ marginBottom: "10px" }}
                    >
                      Logout of Account
                    </Typography>
                    <Typography className={classes.Typography2}>
                      Logging out of your account will stop any session activity
                      across your devices.
                    </Typography>
                  </Box>
                  <Button
                    disableRipple
                    className={classes.buttonText}
                    onClick={handleSaveAndLogout}
                    type="submit"
                    style={{ color: "red", paddingLeft: "0" }}
                  >
                    Yes, logout and save changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ isSubmitting, values, errors }) => (
                  <Form>
                    <Grid
                      item
                      xs={12}
                      style={{
                        margin: "20px 10px 0",
                        paddingLeft: "30px",
                        paddingRight: "15px",
                      }}
                      className={classes.gridBox}
                    >
                      <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                          <ProfileTextField
                            label="Email"
                            type="email"
                            name="email"
                            value={values?.email || ""}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} style={{ margin: "10px 0" }}>
                          <Typography
                            variant="body2"
                            style={{
                              fontWeight: "600",
                              margin: "0px 2px 10px",
                              color: "#000",
                            }}
                          >
                            Change Password
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ padding: "10px 0" }}
                            fullWidth
                            disableElevation
                            onClick={handleOpenDialog}
                          >
                            <Typography className={classes.ButtonTextColor}>
                              Click Here to Change Password
                            </Typography>
                          </Button>

                          {/* Dialog Box for password change */}
                          <CustomDialog
                            user={user}
                            openDialog={openDialog}
                            handleCloseDialog={handleCloseDialog}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        margin: "20px 10px 0",
                        paddingLeft: "30px",
                        paddingRight: "15px",
                      }}
                      className={classes.gridBox}
                    >
                      <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                          <ProfileTextField
                            label="First Name"
                            type="text"
                            name="first_name"
                            autoFocus
                            value={values?.first_name || ""}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <ProfileTextField
                            label="Last Name"
                            type="text"
                            name="last_name"
                            autoFocus
                            value={values?.last_name || ""}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <ProfileSelectField
                            name="country"
                            label="Country"
                            optionalText="Select Country"
                            data={allCountries}
                            value={values?.country || ""}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        margin: "20px 10px 0",
                        paddingLeft: "30px",
                        paddingRight: "15px",
                      }}
                      className={classes.gridBox}
                    >
                      <Grid container spacing={6}>
                        <Grid item xs={12} md={4}>
                          <ProfileTextField
                            label="Contact Number"
                            type="number"
                            name="contactNumber"
                            autoFocus
                            value={values?.contactNumber || ""}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <ProfileTextField
                            label="Designation"
                            type="text"
                            name="designation"
                            autoFocus
                            value={values?.designation || ""}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ margin: "0px 0 20px" }}>
                      <Button
                        disableRipple
                        className={classes.buttonText}
                        onClick={handleDeleteAccount}
                        style={{ color: "#FF2F2F", margin: "20px 10px" }}
                      >
                        Delete your account
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "98.5%", marginLeft: "12px" }}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CompanyProfile;
