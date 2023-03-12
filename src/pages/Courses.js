import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Footer from '../components/Footer';
import CourseCardFull from '../helpers/CourseCardFull';
import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ServerService from '../api';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

const Services = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    ServerService.getCourses()
      .then((result) => {
        setData(result.data);
        setCourses(result.data);
      })
      .catch((err) => {});
  }, []);

  let Datalist = courses.map((val, i) => {
    return <CourseCardFull key={i} val={val} />;
  });

  const onSearch = (e) => {
    if (!e.target.value) {
      setCourses(data);
    }
    let result = data.filter(
      ({ courseName }) =>
        courseName.toLowerCase().search(e.target.value.toLowerCase()) >= 0
    );
    console.log(courses, data, 'result ', result, e.target.value);
    setCourses(result);
  };

  return (
    <div>
      <Container maxWidth='lg' sx={{ minHeight: '100vh', py: 5 }}>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4'>All Courses</Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={onSearch}
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <Grid container spacing={4}>
          {Datalist}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Services;
