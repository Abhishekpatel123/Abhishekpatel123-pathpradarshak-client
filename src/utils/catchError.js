import { setSnackbar } from "../store/features/global";

const catchError = (err, dispatch) => {
  //   if message is not comming form server
  console.log(err?.response , 'error response data is data');

  // if (err.response.status === 401) {
  //   localStorage.clear();
  //   window.location = "/student/login";
  // }
  
  if (
    !err ||
    !err?.response ||
    !err?.response?.data ||
    !err?.response?.data?.message
  ) {
    return dispatch(
      setSnackbar({
        open: true,
        message: "Something went wrong!",
        type: "error",
      })
    );
  }

  const { message } = err?.response?.data;
  dispatch(
    setSnackbar({
      open: true,
      message: message,
      type: "error",
    })
  );
};

export default catchError;
