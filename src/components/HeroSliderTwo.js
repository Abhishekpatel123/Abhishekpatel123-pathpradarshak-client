import React from "react";
import { Box, Typography, Card, CardContent, Container } from "@mui/material";
// import Carousel from "react-elastic-carousel";
// import { upcomingEventsData } from "data/dashboardData";

// import completedPng from "assets/images/completed.png";
// import pendingPng from "assets/images/pending.png";
// import totalPng from "assets/images/total.png";
// import runningPng from "assets/images/running.png";
// import { Title } from "helpers";

// const pnges = [runningPng, completedPng, pendingPng, totalPng];

// import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

let data = [
  {
    bgImg: "crowsel3.png",
    title: "Build Your Dream With Passion",
    description:
      "Learn, Code and start developing your own beautiful websites at no cost.",
    btnLink: "contact-us",
  },
  {
    bgImg: "crowsel2.png",
    title: "Build Your Dream With Passion",
    description:
      "Learn, Code and start developing your own beautiful websites at no cost.",
    btnLink: "contact-us",
  },
  {
    bgImg: "crowsel0.png",
    title: "Build Your Dream With Passion",
    description:
      "Learn, Code and start developing your own beautiful websites at no cost.",
    btnLink: "contact-us",
  },
];

const HeroSliderTwo = () => {
  
  return (
    <>
      <Box
        sx={{
          minHeight: "95vh",
        }}
      >
        {/* <Carous`el
          autoPlay={true}
          animation="fade"
          swipe={true}
          style={{ background: "#333" }}
        >
          {data.map(({ bgImg, title, description, btnLink }, idx) => (
            <Paper
              key={idx}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(/assets/img/slider/${bgImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "80vh",
                borderRadius: "0px !important",
              }}
            >
              <div
                style={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ textShadow: "3px 3px #333" }}
                  gutterBottom
                  variant="h2"
                >
                  {title}
                </Typography>
                <Typography variant="caption" component="p">
                  {description}
                </Typography>
                <Link to={btnLink}>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, width: "200px" }}
                    color="secondary"
                  >
                    Contact us 
                  </Button>
                </Link>
              </div>
            </Paper>
          ))}
        </Carousel>` */}
      </Box>
    </>
  );
};

export default HeroSliderTwo;
