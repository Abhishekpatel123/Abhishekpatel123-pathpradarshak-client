import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { logout, setAuth } from '../store/features/authSlice';
import catchError from '../utils/catchError';
import axiosInstance from './instance';
// import axiosInstance from "./instance";
//registerUser action creator takes data and dispatch action to reducer along with payload

//Login - Get user token , //loginUser action creator
export const loginUser = (userData, dispatch, history) => {
  axios
    .post('https://pathpradarshak.netlify.app/users/login', userData)
    .then((res) => {
      //save token to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      // setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setAuth({ isAuthenticated: true, user: decoded }));
      console.log(decoded, 'decode ');
      // dispatch(setUser(decoded));
      history.push(`${process.env.PUBLIC_URL}/home`);
    })
    .catch((err) => {
      catchError(err, dispatch);
    });
};

//Set loggid in user , //setCurrentUser action creator
export const setCurrentUser = (decoded) => {
  return {
    // type: SET_CURRENT_USER,
    payload: decoded, //actual user with all info
  };
};

//Log user out , //logoutUser action creator
export const logoutUserApi = () => (dispatch) => {
  alert('fsdf');

  //Remove token from lc
  localStorage.removeItem('jwtToken');
  //Remove auth header for fututre requests
  // setAuthToken(false);
  //set current user to {} which will
  dispatch(logout());
};

const ServerService = {
  updateUser: (data, id) => {
    console.log(data, id);
    return axiosInstance().put(`/user?id=${id}`, data);
  },
  readUserData: () => {
    return axiosInstance().get(`/user`);
  },
  deleteUser: (id) => {
    return axiosInstance().delete(`/user?id=${id}`);
  },
  contactUs: (data) => {
    return axiosInstance().post(`/contact-us`, data);
  },
  changePassword: (data) => {
    return axiosInstance().post(`/users/change-password`, data);
  },
  changePassword2: (data) => {
    return axiosInstance().post(`/users/change-password2`, data);
  },
  forgotPassword: (data) => {
    return axiosInstance().post(`/users/forgot-password`, data);
  },

  verifyEmail: (data) => {
    return axiosInstance().post(`/verifying-email`, data);
  },
  registerUser: (data) => {
    return axiosInstance().post('/users/register', data);
  },
  loginUser: (data) => {
    return axiosInstance().post('/users/login', data);
  },
  courseBYInstructor: () => {
    return axiosInstance().get('/coursebyinstructor');
  },
  addCourse: (data) => {
    return axiosInstance().post('/course/add', data);
  },
  addLecture: (data) => {
    return axiosInstance().post('/lectures/localupload', data);
  },
  getCourses: (query = '') => {
    return axiosInstance().get(`/courses?query=${query}`);
  },
  getCategories: () => {
    return axiosInstance().get(`/categories`);
  },
  searchCoursesByQuery: (query) => {
    return axiosInstance().get(`/courses/search?query=${query}`);
  },
  courseEnrolledByStudent: (id) => {
    return axiosInstance().get(
      `/enrollmentbystudent?id=${id}`
    );
  },
};

export default ServerService;
