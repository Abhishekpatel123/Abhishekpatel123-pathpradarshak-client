import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import catchError from '../utils/catchError';
import { setSnackbar } from '../store/features/global';
import ServerService from '../api';
import CustomTextField from '../helpers/CustomTextField';

// import { Progress } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function AddLecture() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    ServerService.courseBYInstructor()
      .then((response) => setCourse(response.data))
      .catch(function (error) {
        catchError(error, dispatch);
      });
  }, []);

  const dispatch = useDispatch();
  const [uploading, setUploading] = useState();

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    course: Yup.string().required('Course is required'),
    file: Yup.mixed(),
    material: Yup.mixed(),
    duration: Yup.object().shape({
      hours: Yup.number().min(0).max(100),
      minutes: Yup.number().min(0).max(60),
    }),
    videoLink: Yup.string()
      .required('please choose any one out of two')
      .when('file', (file) => {
        if (file?.name) return Yup.string();
        else return Yup.string().required('please choose any one out of two');
      }),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      course: '',
      selectedFile: null,
      videoLink: '',
      file: '',
      duration: {
        hours: 0,
        minutes: 30,
      },
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      let { course, title, videoLink, file, material, duration } = values;
      if (videoLink && file) {
        setSnackbar({
          open: true,
          type: 'success',
          message: 'Only add one field between file and video link',
        });
        return;
      } else if (!videoLink && !file) {
        setSnackbar({
          open: true,
          type: 'warning',
          message: 'add One out of video link and file',
        });
        return;
      }
      try {
        if (file) {
          const url = process.env.REACT_APP_CLOUD_URL + '/video/upload';
          const videoForm = new FormData();
          videoForm.append('file', file);
          videoForm.append(
            'upload_preset',
            process.env.REACT_APP_UPLOAD_PRESET
          );
          videoForm.append('resource_type', 'video');
          delete axios.defaults.headers.common['Authorization'];
          const fileUploaded = await axios.post(url, videoForm, {
            withCredentials: false,
          });
          videoLink = fileUploaded.data.secure_url;
        }
        if (material) {
          const url = process.env.REACT_APP_CLOUD_URL + '/raw/upload';
          const materialForm = new FormData();
          materialForm.append('file', material);
          materialForm.append(
            'upload_preset',
            process.env.REACT_APP_UPLOAD_PRESET
          );
          materialForm.append('resource_type', 'video');
          delete axios.defaults.headers.common['Authorization'];
          const materialUploaded = await axios.post(url, materialForm, {
            withCredentials: false,
          });
          material = materialUploaded.data.secure_url;
        }
        const data = { course, title, videoLink, material, duration };
        console.log(data, 'data');
        await ServerService.addLecture(data);
        dispatch(
          setSnackbar({
            open: true,
            type: 'success',
            message: 'Successfully Added',
          })
        );
      } catch (err) {
        catchError(err, dispatch);
      }
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  console.log(errors, 'errors');
  return (
    <div style={{ paddingBottom: '2rem' }}>
      <Container maxWidth='sm'>
        <Typography sx={{ my: 4 }} variant='h4' color='primary'>
          Upload Video
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                id='outlined-select-currency'
                select
                label='Select course'
                {...getFieldProps('course')}
                error={Boolean(touched.course && errors.course)}
                helperText={touched.course && errors.course}
              >
                {course.map((option) => (
                  <MenuItem key={option.courseName} value={option._id}>
                    {option.courseName}
                  </MenuItem>
                ))}
              </TextField>
              <CustomTextField
                label='Video Title'
                error={Boolean(errors.course)}
                name='title'
                type='text'
                helperText={touched.title && errors.title}
              />

              <Box>
                <Typography sx={{ mb: 0.5 }} variant='subtitle1'>
                  Add material{' '}
                </Typography>

                <TextField
                  fullWidth
                  type='file'
                  onChange={(event) => {
                    setFieldValue('material', event.currentTarget.files[0]);
                  }}
                  error={Boolean(touched.material && errors.material)}
                  helperText={touched.material && errors.material}
                />
              </Box>
              <Box>
                <Typography sx={{ mb: 0.5 }} variant='subtitle1'>
                  Select video{' '}
                </Typography>

                <TextField
                  fullWidth
                  type='file'
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  error={Boolean(touched.videoLink && errors.videoLink)}
                  helperText={touched.videoLink && errors.videoLink}
                />
              </Box>
              <Typography align='center' variant='h4'>
                OR
              </Typography>
              <CustomTextField
                label='Add YouTube Video URL'
                name='videoLink'
                type='text'
                error={Boolean(touched.videoLink && errors.videoLink)}
              />

              <Box sx={{ display: 'flex', gap: '10px' }}>
                <CustomTextField
                  label='Hours'
                  name='duration.hours'
                  type='number'
                  max={24}
                  min={0}
                  error={Boolean(
                    touched?.duration?.hours && errors?.duration?.hours
                  )}
                />
                <CustomTextField
                  label='Minutes'
                  name='duration.minutes'
                  type='number'
                  error={Boolean(
                    touched?.duration?.minutes && errors?.duration?.minutes
                  )}
                  max={60}
                  min={0}
                />
              </Box>
              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </div>
  );
}
