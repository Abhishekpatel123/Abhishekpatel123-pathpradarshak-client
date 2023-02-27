import React from 'react';
import Footer from '../components/Footer';
import { Container, Grid, Typography } from '@mui/material';

const About = () => {
  return (
    <div>
      <Container>
        <Grid container spacing={4} sx={{ minHeight: '80vh', my: 8 }}>
          <Grid sx={{}} item xs={12} md={6}>
            <Typography sx={{ my: 1 }} variant='h2' component='h2'>
              We share knowledge with the world .
            </Typography>
            <Typography sx={{ my: 1 }} variant='body1' component='p'>
              By creating and sharing content online such as blog posts, videos,
              and tutorials, you can share your knowledge with the world.
              Additionally, you can join online communities and forums to
              interact with others and answer questions. You can also speak at
              conferences, write books, and teach classes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img alt='edu' src={require('../assets/images/wifi-people.jpg')} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      {/* Mobile Menu */}
      {/* <MobileMenu /> */}
    </div>
  );
};

export default About;
