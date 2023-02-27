import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  gridBox: {
    border: "1px solid rgba(218, 221, 223, 0.5)",
    boxShadow: "4px 4px 10px rgba(218, 221, 223, 0.25)",
    boxSizing: "border-box",
    background: "#fff",
    padding: "29px 0px 29px 30px",
    borderRadius: "5px",
  },
  ProfileImg: {
    width: "120px",
    height: "120px",
    marginRight: "30px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  imageClass: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imageText: {
    textAlign: "center",
    fontSize: "4rem",
    fontWeight: "700",
    lineHeight: "120px",
    overflow: "hidden",
  },
  Box: {
    display: "flex",
    flexDirection: "row",
  },
  DivBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  Typography1: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "22px",
    color: "#263238",
    marginBottom: "10px",
  },
  Typography2: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "17px",
    color: "#A5A5A5",
  },
  button: {
    width: "147px",
    height: "46px",
    marginRight: "20px",
  },
  ButtonTextColor: {
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "17px",
    color: "FFBB00",
    textTransform: "capitalize",
  },
  buttonText: {
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "underline",
    marginTop: "25px",
    textTransform: "none",
    paddingBottom: "0",
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  },
  dialogBox: {
    width: "500px",
    margin: "0 auto",
  },
  dialogAction: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "15px",
  },
}));

export default useStyle;
