import React from "react";
import { Button } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import ServerService from "../api";
import catchError from "../utils/catchError";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../store/features/global";

const VerifyEmail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const onClick = () => {
    if (params?.token) {
      ServerService.verifyEmail({ token: params.token })
        .then((result) => {
          console.log(result, "sdfsadf");
          if (result.status === 200 || result.status === 201) {
            history.push("/login");
          }
        })
        .catch((err) => catchError(err, dispatch));
    } else {
      dispatch(
        setSnackbar({
          open: true,
          title: "verification url is wrong",
          type: "success",
        })
      );
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        size="large"
        color="secondary"
      >
        Activate your account
      </Button>
    </div>
  );
};

export default VerifyEmail;
