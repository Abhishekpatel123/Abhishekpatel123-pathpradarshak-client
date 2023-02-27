import React from 'react';
import { useTheme } from '@mui/material';
// import "./style.css";
// import GoogleLoginButton from "react-google-login-button";
// import NavBar from "../../components/navbar/NavBar";
import { LoginForm } from './helpers/login';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AuthTitle from './helpers/AuthTitle';

const Login = (props) => {
  const params = useParams();
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
      }}
    >
      <Container
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        maxWidth='xs'
      >
        {/* <Card> */}
        {/* <CardContent> */}
        {/* <Grid container spacing={6}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              > */}
        <AuthTitle title='Login' role={params?.role?.toUpperCase()} />
        <LoginForm />
        <Typography variant='subtitle2' sx={{ mt: 1 }}>
          Don’t have an account?{' '}
          <Link
            style={{ color: theme.palette.primary.main }}
            to={`${process.env.PUBLIC_URL}/register/`}
          >
            Signup
          </Link>
        </Typography>
        {/* </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="../assets/img/login_banner.png"
                  alt=""
                  style={{ maxHeight: 500 }}
                  className="img-fluid"
                />
              </Grid>
            </Grid> */}
        {/* </CardContent> */}
        {/* </Card> */}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// export default connect(mapStateToProps, { loginUser })(Login);
export default Login;
