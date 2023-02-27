import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { Component } from "react";
// import Carousel from "react-elastic-carousel";

class ServiceGridSlider extends Component {
  render() {
    // const params = {
    //   slidesPerView: 3,
    //   loop: true,
    //   speed: 1000,
    //   watchSlidesVisibility: true,
    //   spaceBetween: 30,
    //   autoplay: {
    //     delay: 1000,
    //   },
    //   // Responsive breakpoints
    //   breakpoints: {
    //     1499: {
    //       slidesPerView: 3,
    //     },

    //     991: {
    //       slidesPerView: 2,
    //     },

    //     767: {
    //       slidesPerView: 1,
    //     },

    //     575: {
    //       slidesPerView: 1,
    //     },
    //   },
    // };
    let data = [
      {
        bgImg: "service1.jpg",
        title: "React - The Complete Guide (incl Hooks, Redux)",
        description:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor",
        serviceUrl: "service-details-left-sidebar",
      },
      {
        bgImg: "service2.jpg",
        title: "The Complete React Native Course",
        description:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor",
        serviceUrl: "service-details-left-sidebar",
      },
      {
        bgImg: "service3.jpg",
        title: "JavaScript: Understanding the Weird Parts",
        description:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor",
        serviceUrl: "service-details-left-sidebar",
      },
      {
        bgImg: "service1.jpg",
        title: "MongoDB - The Complete Developer Guide",
        description:
          "Lorem ipsum dolor sit amet consect adipisi elit sed do eiusm tempor",
        serviceUrl: "service-details-left-sidebar",
      },
    ];

    // let DataList = data.map((val, i) => {
    //   return (
    //     // <div className="swiper-slide" key={i}>
    //     //   <div className="service-grid-item service-grid-item--style2">
    //     //     <div className="service-grid-item__image">
    //     //       <div className="service-grid-item__image-wrapper">
    //     //         <Link to={`${process.env.PUBLIC_URL}/${val.serviceUrl}`}>
    //     //           <img
    //     //             src={`assets/img/service/${val.img}`}
    //     //             className="img-fluid"
    //     //             alt=""
    //     //           />
    //     //         </Link>
    //     //       </div>
    //     //     </div>
    //     //     <div className="service-grid-item__content">
    //     //       <h3 className="title">
    //     //         <Link to={`${process.env.PUBLIC_URL}/${val.serviceUrl}`}>
    //     //           {val.title}
    //     bgImg         </Link>
    //     //       </h3>
    //     //       <p className="subtitle">{val.description}</p>
    //     //       <Link
    //     //         to={`${process.env.PUBLIC_URL}/${val.serviceUrl}`}
    //     //         className="see-more-link"
    //     //       >
    //     //         SEE MORE
    //     //       </Link>
    //     //     </div>
    //     //   </div>
    //     // </div>
    //   );
    // });
    return (
      // <div>
      //   {/*====================  project grid slider area ====================*/}
      //   <div className="service-slider-title-area grey-bg section-space--inner--top--120 section-space--inner--bottom--285">
      //     <div className="container">
      //       <div className="row">
      //         <div className="col-lg-12">
      //           <div className="section-title-area text-center">
      //             <h2 className="section-title mb-0">
      //               Latest Tutorials <span className="title-icon" />
      //             </h2>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="service-grid-slider-area">
      //     <div className="container">
      //       <div className="row">
      //         <div className="col-lg-12">
      //           <div className="service-slider">
      //             <div className="service-slider__container service-slider__container--style2">
      //               <Swiper {...params}>{DataList}</Swiper>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   {/*====================  End of project grid slider area  ====================*/}
      // </div>
      <Box
        sx={{
          // background:
          //   "linear-gradient(90.56deg,#2706,#ff6 29.69%,#9b4d 52.6%,#2709 98.44%)",
          p: 1,
          pt: 3,
          height: "95vh",
        }}
      >
        {/* <Carousel
          easing="cubic-bezier(1,.15,.55,0.54)"
          tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
          transitionMs={2000}
          enableAutoPlay={true}
          itemsToShow={3}
          outerSpacing={20}
        >
          {data.map(({ bgImg, title, description, btnLink }, idx) => (
            <Card
              key={idx}
              sx={{
                width: "100%",
                background:
                  "linear-gradient(90.56deg,#2706,#ff6 29.69%,#9b4d 52.6%,#2709 98.44%)",
                // "linear-gradient(90.56deg,#27061a,#ff6363 29.69%,#9b4dff 52.6%,#100321 98.44%)",
                borderRadius: "12px",
                padding: "4px",
              }}
            >
              <CardContent
                style={{
                  backgroundColor: "#333",
                  borderRadius: "12px",
                  color: "white",
                  border: "1px solid hsla(0,0%,100%,.1)",
                  minHeight: "80vh",
                  width: "100%",
                  // padding: 10,
                  backgroundImage: `url(/assets/img/service/${bgImg})`,
                  // backgroundSize: "",
                  backgroundRepeat: "no-repeat",
                  backgroundOrigin: "center",
                  backgroundSize: "cover",
                }}
              >
                <Typography
                  sx={{ textShadow: "3px 3px #333" }}
                  gutterBottom
                  variant="h3"
                >
                  {title}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="caption" component="p">
                    {description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
         </Carousel> */}
      </Box>
    );
  }
}

export default ServiceGridSlider;
