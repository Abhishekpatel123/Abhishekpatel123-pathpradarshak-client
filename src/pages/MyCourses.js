import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import CourseCard from "../helpers/CourseCard";
import CourseCardFull from "../helpers/CourseCardFull";
import ServerService from "../api";
// import MobileMenu from "../MobileMenu";
// import BrandLogoSlider from "../BrandLogoSlider";

const ServicesByInstructor = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    ServerService.courseBYInstructor()
      // axios.get("https://pathpradarshak.netlify.app/coursebyinstructor")
      .then((result) => setData(result.data))
      .catch((err) => {
        throw err;
      });
  }, []);

  let Datalist = data.map((val, i) => {
    return (
      <CourseCardFull val={val} key={i} />
      // <CourseCard
      //   val={val}
      //   key={i}
      //   navigationLink={`/blog-details-left-sidebar/${val._id}`}
      //   // thumbnail={val?.thumbnail}
      //   // courseName={val.courseName}
      //   // courseDescription={val.courseDescription}
      // />
    );
  });

  return (
    <div>
      <Container maxWidth="lg" sx={{ minHeight: "100vh", pb: 4 }}>
        <Typography sx={{ pt: 5, pb: 2 }} variant="h4">
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

export default ServicesByInstructor;
