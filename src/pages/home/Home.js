import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import catchError from '../../utils/catchError';
import CourseCardFull from '../../helpers/CourseCardFull';
import Footer from '../../components/Footer';
import { useTheme } from '@mui/material/styles';
import GirlEduSvg from '../../assets/images/girl-edu.svg';
import {
  LaptopChromebook,
  Lightbulb,
  WatchLater,
  Wifi,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import ServerService from '../../api';

const Home = () => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    ServerService.getCourses()
      .then((result) => setCourses(result.data))
      .catch((err) => catchError(err, dispatch));
  }, [dispatch]);

  let Datalist = courses.map((val, i) => (
    <CourseCardFull key={val._id} val={val} />
  ));

  return (
    <div>
      <Container maxWidth='lg'>
        <Grid
          container
          sx={{
            px: {
              sm: 8,
              xs: 2,
            },
            bgcolor: theme.palette.primary.light,
            boxShadow: 1,
            borderRadius: 2,
            py: {
              sm: 6,
              xs: 4,
            },
            mt: 4,
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant='h2'>
              Learn for the sake of your future!
            </Typography>
            <Typography valiant='h6' my={4}>
              Learn new skills from the comfort of your home or anywhere anytime
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Button size='large' variant='contained'>
                Get Started
              </Button>
              <Button size='large' variant='outlined'>
                Become a Teacher
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 4 }}>
            <img alt='edu' src={GirlEduSvg} />
          </Grid>
        </Grid>
      </Container>
      {/* -- What we offer */}
      <Container
        sx={{
          my: 8,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Wifi
            style={{ color: theme.palette.primary.main }}
            sx={{ fontSize: { xs: '16px', sm: '26px' } }}
          />
          <Typography sx={{ fontSize: { xs: '10px', sm: '16px' } }}>
            Online Tutoring
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <WatchLater
            style={{ color: theme.palette.primary.main }}
            sx={{ fontSize: { xs: '16px', sm: '26px' } }}
          />
          <Typography sx={{ fontSize: { xs: '10px', sm: '16px' } }}>
            Lifetime Access
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Lightbulb
            style={{ color: theme.palette.primary.main }}
            sx={{ fontSize: { xs: '16px', sm: '26px' } }}
          />
          <Typography sx={{ fontSize: { xs: '10px', sm: '16px' } }}>
            Active Learning
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <LaptopChromebook
            style={{ color: theme.palette.primary.main }}
            sx={{ fontSize: { xs: '16px', sm: '26px' } }}
          />
          <Typography sx={{ fontSize: { xs: '10px', sm: '16px' } }}>
            150k online courses
          </Typography>
        </Box>
      </Container>

      {/* -- Banner */}
      <Container sx={{ paddingX: 0 }}>
        <img
          alt='edu-banner'
          style={{ margin: 'auto' }}
          src={require('../../assets/images/edu-banner.jpg')}
        />
      </Container>

      {/* -- Courses */}
      <Container maxWidth='lg' sx={{ minHeight: '100vh', pt: 4 }}>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4'>Trending for registered courses</Typography>
        </Box>
        <Grid container spacing={4}>
          {Datalist}
          {Datalist}
          {Datalist}
          {Datalist}
        </Grid>
      </Container>

      {/* -- Become a Teacher */}
      <Container
        sx={{
          py: 6,
          mt: 4,
        }}
      >
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <img alt='edu' src={require('../../assets/images/education.jpg')} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ m: 'auto' }}>
            <Typography variant='h2'>Become an instructor</Typography>
            <Typography valiant='h6' my={4}>
              Instructors from around the world teach millions of students on
              Udemy. We provide the tools and skills to teach what you love.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                size='large'
                LinkComponent={NavLink}
                to='/instructor-register'
                variant='contained'
              >
                Start Teaching Today
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
