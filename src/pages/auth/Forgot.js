import { LoadingButton } from "@mui/lab";
import axios from "axios";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import ServerService from "../../api";
import { setSnackbar } from "../../store/features/global";
import AuthTitle from "./helpers/AuthTitle";

export default function Forgot() {
  const params = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();

  const Schema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Schema,
    onSubmit: async (values) => {
      console.log(values , 'values')
      ServerService.forgotPassword(values)
        .then((response) => {
          dispatch(
            setSnackbar({
              type: "success",
              open: true,
              message: "Check your mail ",
            })
          );
        })
        .catch((error) => {
          dispatch(
            setSnackbar({
              type: "error",
              open: true,
              message: "Sorry something went wrong!",
            })
          );
        });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Container
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <AuthTitle
                  title="Forgot Password"
                  role={params?.role?.toUpperCase()}
                />
                <FormikProvider value={formik}>
                  <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        Submit
                      </LoadingButton>
                    </Stack>
                  </Form>
                </FormikProvider>

                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Don’t have an account?{" "}
                  <Link
                    style={{ color: theme.palette.primary.main }}
                    to={
                      `${process.env.PUBLIC_URL}/register/` +
                      (params?.role || "instructor")
                    }
                  >
                    Signup
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="../assets/img/login_banner.png"
                  alt=""
                  style={{ maxHeight: 500 }}
                  className="img-fluid"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
