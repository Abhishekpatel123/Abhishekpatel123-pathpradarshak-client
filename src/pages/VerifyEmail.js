import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useParams, useHistory } from 'react-router-dom';
import ServerService from '../api';
import catchError from '../utils/catchError';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../store/features/global';
import Loading from '../helpers/loading/Loading';
import { LoadingButton } from '@mui/lab';

const VerifyEmail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onClick = () => {
    if (params?.token) {
      setLoading(true);
      ServerService.verifyEmail({ token: params.token })
        .then((result) => {
          setLoading(false);
          console.log(result, 'sdfsadf');
          if (result.status === 200 || result.status === 201) {
            history.push('/login');
          }
        })
        .catch((err) => {
          setLoading(false);
          catchError(err, dispatch);
        });
    } else {
      dispatch(
        setSnackbar({
          open: true,
          title: 'verification url is wrong',
          type: 'success',
        })
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={loading}
        disabled={loading}
        onClick={onClick}
        color='secondary'
      >
        Activate your account
      </LoadingButton>
    </div>
  );
};

export default VerifyEmail;
