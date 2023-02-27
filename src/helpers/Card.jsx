import { CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const Card = ({ val }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={require("./defaultImg.jpg")}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {val.courseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {val.courseDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Card;
