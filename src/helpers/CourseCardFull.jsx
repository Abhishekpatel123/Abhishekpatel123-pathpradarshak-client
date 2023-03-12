import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
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
  if (description.length > 40) {
    return `${description?.slice(0, 40)} ...`;
  } else return description;
};

const CourseCardFull = ({ val }) => {
  const classes = useStyles();
  return (
    <Grid key={val?.courseName} item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea
          component={Link}
          to={`course-detail/${val._id}`}
          className={classes.cardActionAreaStyle}
        >
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
            <Typography
              variant="body2"
              className={classes.name}
            >{`${val?.instructor?.first_name} ${val?.instructor?.last_name}`}</Typography>

            <Box
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
                {parseFloat(val?.rating).toFixed(2) || "0.0"}
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
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CurrencyRupeeIcon fontSize="small" />
              <Typography variant="h6" sx={{ color: "#333" }}>
                {val?.price || "Free"}
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
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CourseCardFull;
