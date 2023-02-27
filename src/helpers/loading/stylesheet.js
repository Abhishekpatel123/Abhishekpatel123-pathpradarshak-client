import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  loadingLogo: {
    backgroundColor: "#333",
    padding: 10,
    display: "grid",
    placeItems: "center",
    borderRadius: 10,
    boxShadow: theme.shadows[2],
    animation: `$myEffect 3000ms infinite alternate ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateX(-100%)",
    },
    "50%": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "100%": {
      opacity: .2,
      transform: "translateX(100%)",
    },
  },
}));
