import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Autocomplete,
  TextField,
  Box,
  Typography,
  InputBase,
  IconButton,
} from '@mui/material';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import Instructor from './helpers/Instructor';
import Student from './helpers/Student';
import Admin from './helpers/Admin';
import Guest from './helpers/Guest';
import Logo from '../../helpers/Logo';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import catchError from '../../utils/catchError';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import ServerService from '../../api';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles((theme) => ({
  searchDiv: {
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    padding: '6px 16px',
    display: 'flex',
    border: '2px transparent solid',
    margin: '0 2rem',
    // gap: 4,
    // marginLeft: '2rem',
    // maxWidth: '500px',
    flex: 1,
    [theme.breakpoints.down('sm')]: { display: 'none' },
    '&:hover': {
      border: '2px red solid',
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // useEffect(() => {
  //   // const token = localStorage.getItem("jwtToken");
  //   // if (token && (!user?.role || user?.role === undefined)) {
  //   //   const decoded = jwt_decode(token.split(" ")[1]);
  //   //   console.log(decoded, user, "userdeconde ");
  //   //   dispatch(setAuth({ isAuthenticated: true, user: decoded }));
  //   // }
  //   // window.addEventListener("beforeunload", () => {});
  // }, []);
  let timeOutId;
  const handleSearch = (e, value) => {
    console.log(value, 'hello');
    setInputValue(value);
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      console.log('inputValue', inputValue);
      ServerService.searchCoursesByQuery(inputValue)
        .then((response) => {
          console.log(response.data, 'course');
          setSearchResult(response.data);
        })
        .catch((err) => catchError(err, dispatch));
    }, 3000);
  };

  console.log('- user ', user);
  let authLinks =
    user?.role === 'admin' ? (
      <Admin />
    ) : user?.role === 'student' ? (
      <Student />
    ) : user?.role === 'instructor' ? (
      <Instructor />
    ) : (
      <Guest handleCloseNavMenu={handleCloseNavMenu} />
    );

  useEffect(() => {
    user?.role === 'admin' ? (
      <Admin />
    ) : user?.role === 'student' ? (
      <Student />
    ) : user?.role === 'instructor' ? (
      <Instructor />
    ) : (
      <Guest handleCloseNavMenu={handleCloseNavMenu} />
    );
  }, [isAuthenticated, user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ bgcolor: '#fff', boxShadow: '1' }}>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <NavLink
              to='/'
              style={{
                textDecoration: 'none',
                textTransform: 'uppercase',
                // flex: 1,
              }}
            >
              <Logo />
            </NavLink>
            <TextField
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  history.push(`/courses/search?query=${e.target.value}`);
                }
              }}
              variant='standard'
              className={classes.searchDiv}
              margin='normal'
              InputProps={{
                startAdornment: <SearchIcon color='primary' sx={{ mr: 1 }} />,
                disableUnderline: true, // <== added this
                type: 'search',
              }}
              placeholder='Search for anything...'
              color='secondary'
            />
            {isAuthenticated ? authLinks : <Guest />}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
