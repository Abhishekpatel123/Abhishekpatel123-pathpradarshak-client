import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
    '&:hover': { opacity: 0.8 },
  },
  name: {
    textTransform: 'capitalize',
    color: '#6a6f73',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily:
      'sf pro text,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol',
    fontWeight: '400',
    lineHeight: '1.4',
    fontSize: '.9rem',
  },
}));

const getDescription = (description) => {
  if (description.length > 40) {
    return `${description?.slice(0, 40)} ...`;
  } else return description;
};

const CourseCardFullHorizontal = ({ val }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      onClick={() => {
        alert('c');
        navigator(`/blog-details-left-sidebar/${val._id}`);
      }}
    >
      <Box>
        <img
          alt='course'
          style={{
            width: '260px',
            // height: '200px',
            aspectRatio: 'auto 260 / 145;',
          }}
          src={require('./defaultImg.jpg')}
        />
      </Box>
      <Box
        sx={{
          ml: 2,
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          minWidth: '150px',
        }}
      >
        <Box>
          <Typography variant='h6' component='h5'>
            {val?.courseName}
          </Typography>
          <Typography gutterBottom variant='body2' color='text.secondary'>
            {getDescription(val?.courseDescription)}
          </Typography>
          {/* name of instructor  */}
          <Typography
            variant='body2'
            className={classes.name}
          >{`${val?.instructor?.first_name} ${val?.instructor?.last_name}`}</Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 0.2,
            }}
          >
            <Typography variant='subtitle2' sx={{ color: '#b4690e', mr: 0.4 }}>
              {parseFloat(val?.rating).toFixed(2) || '0.0'}
            </Typography>
            <Rating
              name='simple-controlled'
              size='small'
              value={Math.floor(val?.rating) || 0}
              readOnly={true}
            />
            <Typography variant='caption' sx={{ color: '#666', ml: 0.4 }}>
              ({val?.enrolledUsers})
            </Typography>
          </Box>
          <Chip label='Best Seller' color='primary' />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'start' }}>
          <CurrencyRupeeIcon fontSize='small' />
          <Typography variant='h6' sx={{ color: '#333' }}>
            {val?.price || 'Free'}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: '#766',
              textDecoration: 'line-through',
              ml: 1.4,
            }}
          >
            1200
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseCardFullHorizontal;
