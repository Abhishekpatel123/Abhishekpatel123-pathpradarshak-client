// import { Button } from "@mui/material";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStyles } from './style';
import homeFill from '@iconify/icons-eva/home-fill';
import ALL from '@iconify/icons-eva/award-fill';
import Login from '@iconify/icons-eva/lock-outline';
import About from '@iconify/icons-eva/person-add-outline';
import { Box, Typography } from '@mui/material';
import AccountPopover from '../../../helpers/AccountPopover';

const pages = [
  { label: 'About', icon: About, linkTo: '/about-us' },
  { label: 'All Courses', icon: ALL, linkTo: '/services' },
  {
    label: 'Teach on PP',
    icon: Login,
    linkTo: '/instructor-register',
  },
  { label: 'Login', icon: Login, linkTo: '/login' },
];

const Guest = ({ handleCloseNavMenu }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          minHeight: 'inherit',
          alignItems: 'center',
        }}
      >
        <NavLink
          onClick={handleCloseNavMenu}
          to='/about-us'
          className={`${classes.link} `}
          activeClassName={classes.activeLink}
        >
          About
        </NavLink>
        <NavLink
          onClick={handleCloseNavMenu}
          to='/services'
          className={`${classes.link} `}
          activeClassName={classes.activeLink}
        >
          All Courses
        </NavLink>
        <NavLink
          onClick={handleCloseNavMenu}
          to='/instructor-register'
          className={`${classes.link} `}
          activeClassName={classes.activeLink}
        >
          Teach on PP
        </NavLink>
        <NavLink
          onClick={handleCloseNavMenu}
          to='/login'
          className={`${classes.link} `}
          activeClassName={classes.activeLink}
        >
          Login
        </NavLink>

        {/* {pages.map((page, idx) => (
          <NavLink
            key={idx}
            onClick={handleCloseNavMenu}
            to={page.linkTo}
            className={`${classes.link} `}
            activeClassName={classes.activeLink}
          >
            {page.label}
          </NavLink>
        ))} */}
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <AccountPopover isLogin={false} pages={pages} />
      </Box>
    </>
  );
};

export default Guest;
