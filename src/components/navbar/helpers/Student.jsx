import { Box } from "@mui/material";
import React from "react";
import AccountPopover from "../../../helpers/AccountPopover";
import homeFill from "@iconify/icons-eva/home-fill";
import { useStyles } from "./style";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import personFill from "@iconify/icons-eva/person-fill";
import About from "@iconify/icons-eva/person-add-outline";
import ALL from "@iconify/icons-eva/award-fill";
import InfoIcon from '@mui/icons-material/Info';

// import settings2Fill from "@iconify/icons-eva/settings-2-fill";
// import personFill from "@iconify/icons-eva/person-fill";

const Student = ({ handleCloseNavMenu }) => {
  const { user } = useSelector((state) => state.auth);
  const pages = [
    { label: "ABOUT", icon: InfoIcon, linkTo: "/about-us" },
    { label: "ALL COURSES", icon: ALL, linkTo: "/services" },
  ];

  const largeDeviceDropdownLink = [
    {
      label: 'Profile',
      icon: personFill,
      linkTo: '/edit-profile',
    },
    {
      label: ' MY COURSES',
      icon: homeFill,
      linkTo: '/servicesforstudent/' + user.id,
    },
  ];

  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          minHeight: "inherit",
        }}
      >
        {pages.map((page, idx) => (
          <NavLink
            key={idx}
            onClick={handleCloseNavMenu}
            to={page.linkTo}
            className={`${classes.link} `}
            activeClassName={classes.activeLink}
          >
            {page.label}
          </NavLink>
        ))}
        <AccountPopover pages={largeDeviceDropdownLink} isLogin={true} />
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <AccountPopover pages={[...pages, ...largeDeviceDropdownLink]} />
      </Box>
    </>
  );
};

export default Student;
