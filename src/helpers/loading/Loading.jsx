import React from "react";
import { Backdrop, Box } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import { useStyles } from "./stylesheet";

const Loading = ({ open = true, handleClose }) => {
  const classes = useStyles();
  return (
    <Backdrop
      sx={{ background: "transparent" }}
      open={open}
      onClick={handleClose}
    >
      <Box className={classes.loadingLogo}>
        <PendingIcon color="primary" />
      </Box>
    </Backdrop>
  );
};

export default React.memo(Loading);
