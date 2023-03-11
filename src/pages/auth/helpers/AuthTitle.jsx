import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";

const AuthTitle = ({ title, role }) => {
  const theme = useTheme();
  return (
    <Typography sx={{ mb: 1 }} variant="h4">
      {title}
      <span
        style={{
          color: theme.palette.primary.main,
          fontSize: 24,
          fontStyle: "oblique",
          marginLeft: 5,
          textShadow: "1px 1px #333",
          textDecoration: "underline",
          // fontFamily: "Open Sans",
        }}
      >
        {role}
      </span>
    </Typography>
  );
};

export default AuthTitle;
