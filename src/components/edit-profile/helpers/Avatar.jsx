import { IconButton, Typography } from "@mui/material";
import React from "react";

const Avatar = (props) => {
  const {
    name,
    onClick,
    src,
    TypoClassName,
    ProfileClassName,
    ImageClassName,
  } = props;
  const initialsFunction = (name) => {
    // const n = name.split(" ");
    // const lastInitials = n[n.length - 1].charAt(0);
    // const initials = name
    //   .split(" ")
    //   .slice(0, 1)
    //   .map((n) => n[0])
    //   .join("");
    // const uppercaseInitials =
    //   initials.toUpperCase() + lastInitials.toUpperCase();

    const whiteSpace = Boolean(name.indexOf(" ") >= 0);

    if (whiteSpace === true) {
      return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase();
    } else {
      return `${name.charAt(0).toUpperCase()}`;
    }
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }

  return (
    <div
      onClick={onClick}
      className={ProfileClassName}
      style={{
        backgroundColor: name ? stringToColor(name) : "",
      }}
    >
      {src === null ? (
        <Typography className={TypoClassName}>
          {initialsFunction(`${name}`)}
        </Typography>
      ) : (
        <img src={src} className={ImageClassName} alt="user dp" />
      )}
    </div>
  );
};

export const AvatarLogo = (props) => {
  const { name, onClick, src, TypoClassName, IconClassName, ImageClassName } =
    props;

  const initialsFunction = (name) => {
    const whiteSpace = Boolean(name.indexOf(" ") >= 0);

    if (whiteSpace === true) {
      return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`.toUpperCase();
    } else {
      return `${name.charAt(0).toUpperCase()}`;
    }
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
  }
  return (
    <IconButton
      className={IconClassName}
      style={{
        // outline: `${src ? "none" : "1px solid #000"}`,
        backgroundColor: name ? stringToColor(name) : "",
      }}
    >
      {src === null ? (
        <Typography className={TypoClassName}>
          {initialsFunction(`${name}`)}
        </Typography>
      ) : (
        <img src={src} className={ImageClassName} alt="user dp" />
      )}
    </IconButton>
  );
};

export default Avatar;
