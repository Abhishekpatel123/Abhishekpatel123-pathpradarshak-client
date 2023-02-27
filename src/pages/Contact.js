import React from "react";
import Footer from "../components/Footer";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

// material
import {
  Stack,
  Grid,
  Checkbox,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ServerService from "../api";

const Contact = () => {
  const Schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Schema,
    onSubmit: async (values, actions) => {
      ServerService.contactUs(values)
        .then((data) => {
          actions.resetForm();
          alert("Successfully saved");
        })
        .catch((err) => alert("SERVER ERROR "));
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <div style={{ minHeight: "90vh" }}>
      <Container>
        <Typography sx={{ my: 3 }} variant="h2">
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={6} sm={12}>
            <iframe
              style={{ width: "100%", height: "100%" }}
              title="google-map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d392436.93004030554!2d-105.13838587646829!3d39.7265847007123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1558429398879!5m2!1sen!2sbd"
              allowFullScreen
            ></iframe>
          </Grid>
          <Grid item md={6} sm={12}>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <Typography variant="h4">Leave Your Message</Typography>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="text"
                    label="Name"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="Email address"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    autoComplete="username"
                    type="text"
                    label="Message"
                    {...getFieldProps("message")}
                    multiline
                    rows={4}
                    error={Boolean(touched.message && errors.message)}
                    helperText={touched.message && errors.message}
                  />
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Send Message
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </Grid>
        </Grid>

        <div style={{ margin: "10px 0" }}>
          {/* <h3>Contact Information</h3> */}
          <ul>
            <li>
              <span className="icon">
                <i className="ion-android-map" />
              </span>
              <span className="text">
                <span>
                  Stock Building, 125 Main Street 1st Lane, San Francisco, USA
                </span>
              </span>
            </li>
            <li>
              <span className="icon">
                <i className="ion-ios-telephone-outline" />
              </span>
              <span className="text">
                <a href="tel:1234567890">(001) 24568 365 987 </a>
                <a style={{ marginLeft: 15 }} href="tel:1234567890">
                  {" "}
                  (001) 65897 569 784
                </a>
              </span>
            </li>
            <li>
              <span className="icon">
                <i className="ion-ios-email-outline" />
              </span>
              <span className="text">
                <a href="mailto:info@example.com">info@example.com</a>
                <a style={{ marginLeft: 15 }} href="mailto:info@example.com">
                  info@example.com
                </a>
              </span>
            </li>
          </ul>
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
