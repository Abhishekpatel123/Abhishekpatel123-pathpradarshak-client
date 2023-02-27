import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import MenuPopover from "./MenuPopover";
//
import account from "./account";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUserApi } from "../api";
import { logout } from "../store/features/authSlice";
import setAuthToken from "../utils/setAuthToken";
// ----------------------------------------------------------------------

// let MENU_OPTIONS = [
//   {
//     label: "Profile",
//     icon: personFill,
//     linkTo: "/edit-profile",
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover({ pages = [], isLogin = true }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log(isLogin, MENU_OPTIONS, "is login menu op");
  // if (!isLogin) MENU_OPTIONS = [];
  // console.log(isLogin, MENU_OPTIONS, "is login menu op");
  const handleLogout = () => {
    //Remove token from lc
    localStorage.removeItem("jwtToken");
    //Remove auth header for fututre requests
    setAuthToken(false);
    //set current user to {} which will
    dispatch(logout());
    history.push("/home");
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          marginLeft: 2,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        {isLogin && (
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {`${user?.first_name}  ${user?.last_name}`}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {user?.email}
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        {pages.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          {isLogin && (
            <Button
              fullWidth
              color="inherit"
              onClick={handleLogout}
              variant="outlined"
            >
              Logout
            </Button>
          )}
        </Box>
      </MenuPopover>
    </>
  );
}
