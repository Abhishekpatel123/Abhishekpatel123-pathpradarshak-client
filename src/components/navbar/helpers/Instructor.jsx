import { Box } from "@mui/material";
import React from "react";
import AccountPopover from "../../../helpers/AccountPopover";
import homeFill from "@iconify/icons-eva/home-fill";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import About from "@iconify/icons-eva/person-add-outline";
import About from "@iconify/icons-eva/info-fill";
import ALL from "@iconify/icons-eva/award-fill";
import AddOutline from "@iconify/icons-ant-design/file-add-outline";
import InfoIcoXn from "@mui/icons-material/Info";
import personFill from "@iconify/icons-eva/person-fill";

import { useStyles } from "./style";

const Instructor = ({ handleCloseNavMenu }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const pages = [
    { label: "ABOUT", icon: About, linkTo: "/about-us" },
    {
      label: " MY COURSES",
      icon: homeFill,
      linkTo: "/my-services/" + user?.id,
    },
    { label: "ALL COURSES", icon: ALL, linkTo: "/services" },
    {
      label: "ADD COURSES",
      icon: AddOutline,
      linkTo: "/addcourse/" + user?.id,
    },
    {
      label: "ADD LECTURE",
      icon: AddOutline,
      linkTo: "/add-lecture",
    },
  ];

  const largeDeviceDropdownLink = [
    {
      label: "Profile",
      icon: personFill,
      linkTo: "/edit-profile",
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          minHeight: "inherit",
          alignItems: "center",
        }}
      >
        {pages.map((page, idx) => (
          <NavLink
            key={idx}
            // onClick={handleCloseNavMenu}
            to={page.linkTo}
            className={`${classes.link} `}
            activeClassName={classes.activeLink}
          >
            {page.label}
          </NavLink>
        ))}
        <AccountPopover pages={largeDeviceDropdownLink} />
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <AccountPopover pages={[...pages, ...largeDeviceDropdownLink]} />
      </Box>
    </>
  );
};

export default Instructor;
