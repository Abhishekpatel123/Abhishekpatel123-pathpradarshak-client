import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Box } from '@mui/material';

import Loading from './helpers/loading/Loading';
import PrivateRoute from './components/common/PrivateRoute';
import AddLecture from './pages/Addlecture';

import setAuthToken from './utils/setAuthToken';
import { setAuth } from './store/features/authSlice';

import VerifyEmail from './pages/VerifyEmail';
import EditProfile from './components/edit-profile/EditProfile';
import InstructorRegister from './pages/auth/InstructorRegister';
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Forgot = React.lazy(() => import('./pages/auth/Forgot'));
const ChangePassword = React.lazy(() => import('./pages/auth/ChangePassword'));
const Home = React.lazy(() => import('./pages/home/Home'));
const About = React.lazy(() => import('./pages/About'));
const Courses = React.lazy(() => import('./pages/Courses'));
const AddCourse = React.lazy(() => import('./pages/AddCourse'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NoMAtch = React.lazy(() => import('./pages/auth/404'));
const Navbar = React.lazy(() => import('./components/navbar/NavBar'));
const MyCourses = React.lazy(() =>
  import('./pages/MyCourses')
);
const SearchResults = React.lazy(() => import('./pages/SearchResults'));

const Servicesforstudent = React.lazy(() =>
  import('./components/service/ServiceforStudent')
);
const CourseDetail = React.lazy(() => import('./pages/CourseDetail'));

const Routes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.jwtToken) {
      //set auth token header auth
      setAuthToken(localStorage.jwtToken);
      //decode token and get user info and export default
      const decoded = jwt_decode(localStorage.jwtToken);
      //set user and isauthenticated
      //we can call any action using below method
      dispatch(setAuth({ user: decoded, isAuthenticated: true }));

      //check for expired token
      const currentTime = Date.now() / 1000;
      let isExpire = currentTime > decoded.exp ? true : false;
      if (isExpire) {
        dispatch(setAuth({ user: {}, isAuthenticated: false }));
        localStorage.clear();
        window.location.href = '/';
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter basename={'/'}>
      <React.Suspense fallback={<Loading />}>
        <Navbar />
        <Box sx={{ pt: 8 }}>
          <Switch>
            {/*  PUBLIC ROUTES  */}
            <Route exact path={`/`} component={Home} />
            <Route exact path={`/home`} component={Home} />
            <Route exact path={`/about-us`} component={About} />
            <Route exact path={`/contact-us`} component={Contact} />
            <Route exact path={`/login`} component={Login} />
            <Route exact path={`/register`} component={Register} />
            <Route
              exact
              path={`/instructor-register`}
              component={InstructorRegister}
            />
            <Route exact path={`/forgot-password`} component={Forgot} />
            <Route
              exact
              path={`/change-password/:token`}
              component={ChangePassword}
            />
            <Route
              exact
              path={`/verify-email/:token`}
              component={VerifyEmail}
            />
            <PrivateRoute
              exact
              path={`/servicesforstudent/:id`}
              component={Servicesforstudent}
            />
            <Route exact path={`/addcourse/:id`} component={AddCourse} />
            <Route
              exact
              path={`/add-lecture`}
              component={() => <AddLecture />}
            />
            <Route
              exact
              path={`/my-courses/:id`}
              component={MyCourses}
            />
            <Route exact path={`/courses/search`} component={SearchResults} />
            <Route exact path={`/courses`} component={Courses} />
            <Route exact path={`/course-detail/:id`} component={CourseDetail} />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/edit-profile`}
              component={EditProfile}
            />
            <PrivateRoute component={NoMAtch} />
          </Switch>
        </Box>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Routes;
