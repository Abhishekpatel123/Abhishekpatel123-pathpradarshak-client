import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { Box } from '@mui/material';

import Loading from './helpers/loading/Loading';
import PrivateRoute from './components/common/PrivateRoute';
import AddLecture from './blog/Addlecture';
// import BlogLeftSidebar from "./blog/BlogLeftSidebar";

import setAuthToken from './utils/setAuthToken';
import { setAuth } from './store/features/authSlice';

import VerifyEmail from './pages/VerifyEmail';
import EditProfile from './components/edit-profile/EditProfile';
import InstructorRegister from './pages/auth/InstructorRegister';
// const VerifyEmail = React.lazy("./pages/VerifyEmail");
// const EditProfile = React.lazy("./components/edit-profile/EditProfile");
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Forgot = React.lazy(() => import('./pages/auth/Forgot'));
const ChangePassword = React.lazy(() => import('./pages/auth/ChangePassword'));
const Home = React.lazy(() => import('./pages/home/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./components/service/Services'));
const AddCourse = React.lazy(() => import('./blog/AddCourse'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NoMAtch = React.lazy(() => import('./pages/auth/404'));
const Navbar = React.lazy(() => import('./components/navbar/NavBar'));
// const AddLecture = React.lazy(() => import("./blog/Addlecture"));
const ServicesForInstructor = React.lazy(() =>
  import('./components/service/ServicesByInstructor')
);
const SearchResults = React.lazy(() => import('./pages/SearchResults'));

const Servicesforstudent = React.lazy(() =>
  import('./components/service/ServiceforStudent')
);
// const ServiceDetailsLeftSidebar = React.lazy(() =>
//   import("./components/service/ServiceDetailsLeftSidebar")
// );
const BlogDetailsLeftSidebar = React.lazy(() =>
  import('./blog/BlogDetailsLeftSidebar')
);

// const Loading = React.lazy(() => import("./helpers/loading/Loading"));
// const ShowCourseList = React.lazy(() => import("./delete.admin/showCourseAdmin"));
// import "./index.scss";
// import UserList from "./admin/showallusers";
// import CreateUser from "./admin/createuser";
// import EditUser from "./admin/edituser";
// import ShowCategoryList from "./admin/ShowCategoryAdmin";
// import EditCourseList from "./admin/editCourseAdmin";
// import CreateCategoryAdmin from "./admin/createCategoryAdmin";
// import EditCategoryList from "./admin/editCategoryAdmin";
// import EnrollmentList from "./admin/showEnrollAdmin";
// import Dashboard from "./admin/Dashboard";
// import CreateEnrollAdmin from "./admin/createEnrollAdmin";
// import Projects from "./project/Projects";
// import ProjectDetails from "./project/ProjectDetails";
// import * as serviceWorker from "./serviceWorker";
// import PageNotFound from "./pages/404";

//actions
// import { setCurrentUser, logoutUser } from "./actions/authActions";
// import { clearCurrentProfile } from "./actions/profileActions";

//profile stuff

// import CreateProfile from "./components/create-profile/CreateProfile";
// import AddExperience from "./components/add-credentials/AddExperience";
// import AddEducation from "./components/add-credentials/AddEducation";
// import Profile from "./components/profile/Profile";
// import FinalDashboard from "./components/FinalDashboard";
// import FinalProfiles from "./components/FinalProfiles";
// check for token  to avoid state destroy on reload

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
  }, []);

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
            {/* <Route exact path={`/login/:role`} component={Login} /> */}
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

            {/* PROTECTED ROUTES */}
            {/* <PrivateRoute */}
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
            {/* <PrivateRoute */}
            <Route
              exact
              path={`/my-services/:id`}
              component={ServicesForInstructor}
            />

            <Route exact path={`/courses/search`} component={SearchResults} />
            {/* <PrivateRoute */}
            <Route exact path={`/services`} component={Services} />
            {/* <PrivateRoute */}
            <Route
              exact
              path={`/blog-details-left-sidebar/:id`}
              component={BlogDetailsLeftSidebar}
            />
            {/* <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/blog-left-sidebar`}
              component={BlogLeftSidebar}
            /> */}
            {/* <PrivateRoute */}

            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/edit-profile`}
              component={EditProfile}
            />

            {/* <Route
              exact
              path={`/service-details-left-sidebar`}
              component={ServiceDetailsLeftSidebar}
            /> */}

            {/* <Route exact path={`/ShowCourseList`} component={ShowCourseList} /> */}
            {/*
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/projects`}
              component={Projects}
            />
            
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/project-details`}
              component={ProjectDetails}
            />
            
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/blog-details-left-sidebar/:id`}
              component={BlogDetailsLeftSidebar}
            />*/}
            {/* <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers`}
              component={UserList}
            />
             <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/users/create`}
              component={CreateUser}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/allusers/edit/:id`}
              component={EditUser}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/dashboard`}
              component={Dashboard}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/createEnrollAdmin`}
              component={CreateEnrollAdmin}
            />
             <Route
              exact
              path={`${process.env.PUBLIC_URL}/EnrollmentList`}
              component={EnrollmentList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowCategoryList`}
              component={ShowCategoryList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowCourseList/edit/:id`}
              component={EditCourseList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/ShowCategoryList/edit/:id`}
              component={EditCategoryList}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/CreateCategoryAdmin`}
              component={CreateCategoryAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/add-lecture/:id`}
              component={AddLecture}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/404`}
              component={PageNotFound}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/finaldashboard`}
              component={FinalDashboard}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/create-profile`}
              component={CreateProfile}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/add-experience`}
              component={AddExperience}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/finalprofiles`}
              component={FinalProfiles}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/profile/:handle`}
              component={Profile}
            />
            <PrivateRoute
              exact
              path={`${process.env.PUBLIC_URL}/add-education`}
              component={AddEducation}
            />
             */}
            <PrivateRoute component={NoMAtch} />
          </Switch>
        </Box>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Routes;
