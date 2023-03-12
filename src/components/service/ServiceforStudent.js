import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import BrandLogoSlider from "../BrandLogoSlider";
import Footer from '../Footer';
// import MobileMenu from "../MobileMenu";
// import { Link } from "react-router-dom";
import {
  // CardContent,
  // CardMedia,
  Container,
  Grid,
  Typography,
  // Card,
  // CardActionArea,
  // Button,
  // CardActions,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import CourseCard from '../../helpers/CourseCard';
import ServerService from '../../api';

const Services = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    ServerService.courseEnrolledByStudent(params.id).then((result) => {
      console.log(result.data[0]);
      setData(result.data);
    });
  }, [params.id]);

  let Datalist = data.map(({ course }, i) => {
    console.log(course, 'course', i);
    return (
      <CourseCard
        key={i}
        val={course}
        // courseName={course.courseName}
        // courseDescription={course.courseDescription}
        navigationLink={`/course-detail/${course?._id}`}
      />
    );
  });

  if (!data || data.length === 0) {
    return (
      <Typography textAlign='center' sx={{ pt: 5, pb: 2 }} variant='h2'>
        No Courses
      </Typography>
    );
  }

  return (
    <div>
      <Container
        maxWidth='lg'
        style={{ minHeight: '100vh', paddingBottom: '1rem ' }}
      >
        <Typography sx={{ pt: 5, pb: 2 }} variant='h4'>
          My Courses
        </Typography>
        <Grid container spacing={4}>
          {Datalist}
        </Grid>
      </Container>

      <Footer />
    </div>
  );
};

export default Services;
