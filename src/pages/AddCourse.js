import React, { useEffect, useState } from 'react';
import axios from 'axios';
// material
import * as Yup from 'yup';

import {
  Stack,
  TextField,
  Container,
  MenuItem,
  Typography,
  Box,
  Switch,
} from '@mui/material';

// import ShowCategory from './ShowCategory';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ServerService from '../api';
import catchError from '../utils/catchError';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const levels = [
  { label: 'Beginner', value: 0 },
  { label: 'Intermediate', value: 1 },
  { label: 'Expert', value: 2 },
];

const AddCourse = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const addCourseSchema = Yup.object().shape({
    courseName: Yup.string().required('Course name is required!'),
    courseDescription: Yup.string().required(
      'Course description name is required!'
    ),
    category: Yup.string().required('Course category is required!'),
    level: Yup.string().required('Level is required!'),
    thumbnail: Yup.mixed().required('Course thumbnail is required!'),
  });

  const formik = useFormik({
    initialValues: {
      courseName: '',
      courseDescription: '',
      instructor: params.id,
      category: '',
      thumbnail: '',
      price: 'Free',
    },
    validationSchema: addCourseSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('file', values.thumbnail);
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
      const url = process.env.REACT_APP_CLOUD_URL + '/image/upload';
      try {
        delete axios.defaults.headers.common['Authorization'];
        const fileUploaded = await axios.post(url, formData, {
          withCredentials: false,
        });
        values.thumbnail = fileUploaded.data.secure_url;
        await ServerService.addCourse(values);
        history.push('/add-lecture');
      } catch (err) {
        catchError(err, dispatch);
      }
    },
  });

  useEffect(() => {
    ServerService.getCategories()
      .then((response) => {
        setTodos(response.data);
      })
      .catch(function (error) {
        catchError(error, dispatch);
      });
  }, []);

  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  // render() {
  // var message = "You selected " + this.state.category;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // minHeight: "85vh",
        paddingBottom: 20,
        paddingTop: 30,
      }}
    >
      <Container
        maxWidth='sm'
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4' color='primary' sx={{ mb: 1 }}>
          Add Course
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete='username'
                type='text'
                label='Enter course name'
                {...getFieldProps('courseName')}
                error={Boolean(touched.courseName && errors.courseName)}
                helperText={touched.courseName && errors.courseName}
              />
              <TextField
                fullWidth
                autoComplete='username'
                type='text'
                multiline
                rows={3}
                label='Enter description'
                {...getFieldProps('courseDescription')}
                error={Boolean(
                  touched.courseDescription && errors.courseDescription
                )}
                helperText={
                  touched.courseDescription && errors.courseDescription
                }
              />
              <Box>
                <Typography sx={{ mb: 0.5 }} variant='subtitle1'>
                  Select your thumbnail{' '}
                </Typography>
                <TextField
                  fullWidth
                  autoComplete='username'
                  type='file'
                  onChange={(e) => {
                    console.log('e target files ', e.target.files);
                    setFieldValue('thumbnail', e.target.files[0]);
                  }}
                  error={Boolean(touched.thumbnail && errors.thumbnail)}
                  helperText={touched.thumbnail && errors.thumbnail}
                />
              </Box>
              <TextField
                id='outlined-select-currency'
                select
                label='Select category'
                {...getFieldProps('category')}
                error={Boolean(touched.category && errors.category)}
                helperText={touched.category && errors.category}
              >
                {todos.map((option, i) => (
                  <MenuItem
                    key={option.categoryName + 1}
                    value={option.categoryName}
                  >
                    {option.categoryName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='outlined-select-currency'
                select
                label='Select Level'
                {...getFieldProps('level')}
                error={Boolean(touched.level && errors.level)}
                helperText={touched.level && errors.level}
              >
                {levels.map((option, i) => (
                  <MenuItem key={option.label + 1} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '90px',
                  m: 0,
                }}
              >
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  {...label}
                  // defaultChecked
                  color='primary'
                />
                <Typography sx={{ mr: 3 }} variant='h6'>
                  {' '}
                  Free{' '}
                </Typography>
                {!checked && (
                  <TextField
                    fullWidth
                    autoComplete='username'
                    type='number'
                    label='Price in rupees'
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                )}
              </Box>
            </Stack>

            <LoadingButton
              fullWidth
              size='large'
              style={{ margin: 10 }}
              type='submit'
              variant='contained'
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Container>
    </div>
  );
  // }
};

export default AddCourse;
