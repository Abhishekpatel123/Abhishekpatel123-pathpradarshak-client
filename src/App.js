import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./routes";

import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar } from "./store/features/global";
import MuiAlert from "@mui/material/Alert";

let vertical = "bottom";
let horizontal = "right";

const App = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector((state) => state.global);
  const handleClose = () => dispatch(closeSnackbar());

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <ThemeConfig>
      <GlobalStyles />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Routes />
    </ThemeConfig>
  );
};

export default App;
