import React from 'react';
import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Logo = ({ type = 'desktop' }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display:
          type === 'mobile'
            ? { xs: 'flex', md: 'none', alignItems: 'center' }
            : { xs: 'none', md: 'flex', alignItems: 'center' },
      }}
    >
      <Typography
        variant='h4'
        sx={{
          color: 'black',
          fontFamily: 'cursive',
          fontWeight: 'bolder',
        }}
      >
        PathPradarshak
      </Typography>
    </Box>
  );
};

export default Logo;
