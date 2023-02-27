import React from "react";
import { Link } from "react-router-dom";
import {
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Card,
  CardActionArea,
  Button,
  CardActions,
  Box,
  Rating,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const useStyles = makeStyles((theme) => ({
  cardActionAreaStyle: {
    "&:hover": { color: "#333" },
  },
  name: {
    textTransform: "capitalize",
    color: "#6a6f73",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily:
      "sf pro text,-apple-system,BlinkMacSystemFont,Roboto,segoe ui,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol",
    fontWeight: "400",
    lineHeight: "1.4",
    fontSize: ".9rem",
  },
}));

const getDescription = (description) => {
  if (description?.length > 40) {
    return `${description?.slice(0, 40)} ...`;
  } else return description;
};

const CourseCard = ({
  // courseName,
  courseDescription,
  navigationLink,
  // thumbnail,
  val,
}) => {
  const classes = useStyles();
  return (
    <>
      {/* <Grid item md={4} sm={6} xs={12}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={thumbnail || require("./defaultImg.jpg")}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {courseName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {courseDescription}
            </Typography>
          </CardContent>
          <CardActionArea>
            <CardActions style={{ padding: "0" }}>
              <Button
                fullWidth
                style={{
                  width: "100%",
                  borderRadius: "0",
                }}
                component={Link}
                to={navigationLink}
                variant="contained"
                color="secondary"
              >
                More
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid> */}
      <Grid key={val?._id} item md={3}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={val?.thumbnail || require("./defaultImg.jpg")}
            alt="green iguana"
          />
          <CardContent>
            {/* title  */}
            <Typography variant="h6" component="h5">
              {val?.courseName}
            </Typography>

            {/* description  */}
            <Typography gutterBottom variant="body2" color="text.secondary">
              {getDescription(val?.courseDescription)}
            </Typography>

            {/* name of instructor  */}
            {/* <Typography
              variant="body2"
              className={classes.name}
            >{`${val?.instructor?.first_name} ${val?.instructor?.last_name}`}</Typography> */}

            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                my: 0.2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "#b4690e", mr: 0.4 }}
              >
                {val?.rating || "0.0"}
              </Typography>
              <Rating
                name="simple-controlled"
                size="small"
                value={Math.floor(val?.rating) || 0}
                readOnly={true}
              />
              <Typography variant="caption" sx={{ color: "#666", ml: 0.4 }}>
                ({val?.enrolledUsers})
              </Typography>
            </Box> */}
            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
              <CurrencyRupeeIcon fontSize="small" />
              <Typography variant="h6" sx={{ color: "#333" }}>
                700
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#766",
                  textDecoration: "line-through",
                  ml: 1.4,
                }}
              >
                1200
              </Typography>
            </Box> */}
          </CardContent>
          <CardActionArea
            component={Link}
            to={`blog-details-left-sidebar/${val?._id}`}
            className={classes.cardActionAreaStyle}
          >
            <CardActions style={{ padding: 0 }}>
              <Button
                fullWidth
                style={{
                  width: "100%",
                  borderRadius: "0",
                }}
                component={Link}
                to={navigationLink}
                variant="contained"
                color="secondary"
              >
                More
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
};

export default CourseCard;
