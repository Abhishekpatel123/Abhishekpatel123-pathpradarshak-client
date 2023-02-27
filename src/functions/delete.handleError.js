import { setSnackbar } from "../store/features/global";

const handleError = (err, dispatch) => {
  const message = Object.values(err?.response?.data).reduce(
    (prev, curr) => curr + " , " + prev
  );
  dispatch(
    setSnackbar({
      open: true,
      type: "error",
      message: message || "Something went wrong",
    })
  );
};

export default handleError;
