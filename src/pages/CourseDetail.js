import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Rating,
  Modal,
} from '@mui/material';
import axios from 'axios';
import useRazorpay, { RazorpayOptions } from 'react-razorpay';
import catchError from '../utils/catchError';

import Footer from '../components/Footer';
import VideoList from '../components/courseDetail/VideoList';
import { setSnackbar } from '../store/features/global';
// import VideoDetail from "./VideoDetail";
// import MobileMenu from "../components/MobileMenu";
// import BrandLogoSlider from "../components/BrandLogoSlider";
// import { ToastContainer, toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BlogDetailsLeftSidebar = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const Razorpay = useRazorpay();

  const [lectures, setLectures] = useState([]);
  const [course, setCourse] = useState({});
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const [enrolled, setEnrolled] = useState('ADD TO COURSE LIST');
  const [addCourse, setAddCourse] = useState(false);
  const [rating, setRating] = useState(0);
  const status = 'loading';

  useEffect(() => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/checkenrollment?studentId=${user.id}&&courseId=${params.id}`;
    const callApis = async () => {
      try {
        const response2 = await axios.get(URL);
        setLectures(response2.data.lectures);
        setCourse(response2.data.course);
        if (response2.data.isUserEnrolled) {
          setRating(response2.data.isUserEnrolled.rating);
          setEnrolled('ALREADY ENROLLED');
        }
      } catch (err) {
        catchError(err, dispatch);
      }
    };
    if (user.role === 'student') setAddCourse(true);
    callApis();
  }, [user]);

  const createOrder = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/razorpay/create-order-id`;
    try {
      const data = {
        courseId: params.id,
        data: {
          student: user.id,
          course: params.id,
          approved: true,
        },
      };
      const response = await axios.post(URL, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaidCourse = async (params) => {
    const { payment } = await createOrder(params); //  Create order on your backend
    const options = {
      key: process.env.REACT_APP_RAZORYPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: payment.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: payment.currency,
      name: 'Invision Learnovative',
      description: 'Learn every day with good mentors',
      image: 'https://example.com/your_logo',
      order_id: payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        enrollCourse(response);
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: course?.instructor?.first_name + course?.instructor?.last_name,
        email: course?.instructor?.email,
        contact: '9999999999',
      },
      notes: { address: 'Razorpay Corporate Office' },
      theme: { color: '#3399cc' },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      dispatch(
        setSnackbar({ open: true, message: 'Payment Failed', type: 'error' })
      );
      return setOpen(false);
    });
    rzp1.open();
  };

  const handleFreeCourse = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/enrollbystudent/create-free-course`;
    const data = {
      student: user.id,
      course: params.id,
      approved: true,
    };
    try {
      await axios.post(URL, data);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Successfully enrolled!',
          type: 'success',
        })
      );
      setOpen(false);
    } catch (err) {
      catchError(err);
      return setOpen(false);
    }
  };

  const enrollCourse = async (response) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/enrollbystudent/create-paid-course`;
    const data = {
      student: user.id,
      course: params.id,
      approved: true,
      payment: response,
      price: course?.price,
    };

    try {
      await axios.post(URL, data);
      setEnrolled('ALREADY ENROLLED');
      setOpen(false);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Successfully course enrolled',
          type: 'success',
        })
      );
      return setOpen(false);
    } catch (err) {
      catchError(err, dispatch);
      return setOpen(false);
    }
  };
  const handleRate = async (event, newValue) => {
    const data = {
      student: user.id,
      course: params.id,
      approved: true,
      rating: newValue,
    };
    setRating(newValue);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/enrollbystudent/rate-course`;
    try {
      await axios.post(URL, data);
    } catch (err) {
      catchError(err);
    }
  };

  const handleCourse = () => {
    console.log(course, 'user');
    if (!course?.price || course?.price === 'Free') handleFreeCourse();
    else handlePaidCourse();
  };
  const onVideoSelect = (index) => setSelectedLectureIndex(index);

  const toSeconds = (time) => {
    console.log(time, 'time');
    if (time?.hours > -1 && time?.minutes) {
      return time.hours * 60 * 60 + time.minutes * 60;
    } else {
      return 0;
    }
  };
  const sum = (a, b) => a + b;

  // Assuming your array is named 'arr'
  const calculateDuration = () => {
    if (course?.duration && course?.duration.length > 0) {
      var totalSeconds = course?.duration?.map(toSeconds).reduce(sum);
      console.log(totalSeconds);
      if (totalSeconds === 0) {
        return 'No Duration';
      }
      return totalSeconds / (60 * 60) + 'hours';
    } else return 'No Duration';
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 2 }}
            id='modal-modal-title'
            variant='h6'
            component='h2'
          >
            Are you sure you want to enroll in this course?
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant='outlined'
              color='error'
              sx={{ mr: 1 }}
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button variant='outlined' color='success' onClick={handleCourse}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#333',
        }}
      >
        <Typography variant='h1' sx={{ color: '#e1e1e1' }} align='center'>
          Course Details
        </Typography>
      </Box>

      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item md={8} sx={{ my: 2 }}>
            {lectures[selectedLectureIndex] &&
            lectures[selectedLectureIndex]?.videoLink.includes('youtube') ? (
              <ReactPlayer
                controls={true}
                width='100%'
                url={lectures[selectedLectureIndex]?.videoLink}
              />
            ) : (
              <iframe
                style={{ width: '100%', minHeight: '80vh' }}
                src={lectures[selectedLectureIndex]?.videoLink}
                title='W3Schools Free Online Web Tutorials'
              ></iframe>
            )}
            {/* parent */}
            <Box
              sx={{ display: 'flex', my: 2, justifyContent: 'space-between' }}
            >
              {/* child */}
              <Box>
                <Box>
                  <Box>
                    <h2>
                      {' '}
                      {lectures.length > 0
                        ? lectures[selectedLectureIndex].title
                        : status}
                    </h2>
                    {lectures[selectedLectureIndex]?.material && (
                      <a
                        download
                        href={lectures[selectedLectureIndex]?.material}
                      >
                        Attachment{' '}
                      </a>
                    )}
                  </Box>
                  <p>
                    {lectures.length > 0
                      ? lectures[selectedLectureIndex]?.course
                          ?.courseDescription
                      : status}
                  </p>
                </Box>
                {user.role === 'student' &&
                  enrolled !== 'ADD TO COURSE LIST' && (
                    <>
                      <Typography variant='h6'>
                        - Rate your instructor
                      </Typography>
                      <Rating
                        name='simple-controlled'
                        value={rating}
                        onChange={handleRate}
                      />
                    </>
                  )}
              </Box>
              {/* child */}
              <Box sx={{ whiteSpace: 'nowrap' }}>
                duration : {calculateDuration()}
              </Box>
            </Box>
          </Grid>
          <Grid item md={4} sx={{ mt: 2 }}>
            <VideoList
              selectedLectureIndex={selectedLectureIndex}
              onVideoSelect={onVideoSelect}
              lectures={lectures}
            />
          </Grid>
          <Grid item md={8} sx={{ pb: 3 }}></Grid>
          <Grid item md={4} sx={{ pb: 3 }}>
            <Button
              disabled={enrolled === 'ADD TO COURSE LIST' ? false : true}
              style={addCourse ? {} : { display: 'none' }}
              onClick={() => setOpen(true)}
              variant='outlined'
              color='secondary'
            >
              {enrolled}
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default BlogDetailsLeftSidebar;
