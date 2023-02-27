import React from 'react';
import { RegisterForm } from './helpers/register';
import { useTheme } from '@mui/material';

import { Container, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AuthTitle from './helpers/AuthTitle';

const InstructorRegister = (props) => {
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
        maxWidth='xs'
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <AuthTitle title='Become a PathPradershak instructor' />
        <Typography variant='subtitle2' sx={{ mb: 2 }}>
          Discover a supportive community of online instructors. Get instant
          access to all course creation resources.
        </Typography>
        <RegisterForm role='instructor' />

        <Typography variant='subtitle2' sx={{ mt: 1 }}>
          Don’t have an account?{' '}
          <Link
            style={{ color: theme.palette.primary.main }}
            to={`${process.env.PUBLIC_URL}/login/`}
          >
            Login
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default InstructorRegister;
