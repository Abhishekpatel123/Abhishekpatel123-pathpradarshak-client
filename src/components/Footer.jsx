import React from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Logo from '../helpers/Logo';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 5, 0, 5),
    backgroundColor: '#000',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      padding: theme.spacing(0, 3),
    },
  },
  footer_inner: {},
  footer_title: {
    fontWeight: 'bold',
    fontSize: 'clamp(22px, 4vw, 42px)',
    lineHeight: '1.2',
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '50px',
      marginBottom: '20px',
    },
  },
  footer_info: {
    backgroundColor: '#000',
    color: '#fff',
    paddingLeft: theme.spacing(15),
    // paddingRight: theme.spacing(15),
    overflowX: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 4),
    },
  },
  footer_title_description: {
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      marginBottom: '30px',
    },
  },
  footer_links: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    color: '#fff',
    // border: '1px dashed white',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 0),
      flexDirection: 'row',
      fontSize: '0.7rem',
    },
  },
  link: {
    margin: theme.spacing(1, 0),
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
  copyright: {
    padding: theme.spacing(6, 0, 3, 0),
    textAlign: 'center',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      color: '#fff',
      padding: theme.spacing(0, 0, 3, 0),
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={8} className={classes.footer_inner}>
        <Paper square elevation={0} className={classes.footer_info}>
          {/* <Typography color='inherit' className={classes.footer_title}>
            Ready to get started?
          </Typography> */}

          <Typography
            color='inherit'
            className={classes.footer_title_description}
          >
            Top companies choose Udemy Business to build in-demand career
            skills.
          </Typography>
          <Box sx={{ bgcolor: 'white', width: 'fit-content' }}>
            <Logo />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography className={classes.footer_links}>
          <NavLink className={classes.link} to='/'>
            Home
          </NavLink>
          <NavLink className={classes.link} to='/contact'>
            Contact us
          </NavLink>
          <NavLink className={classes.link} to='/'>
            Resources
          </NavLink>
          <NavLink className={classes.link} to='/'>
            Projects
          </NavLink>
          <NavLink className={classes.link} to='/'>
            Company news
          </NavLink>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.copyright}>
          © PathPradarshak 2021. All right reserved
        </Typography>
      </Grid>
    </Grid>
  );
}
