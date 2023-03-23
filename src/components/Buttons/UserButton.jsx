import { AiOutlineUser } from "react-icons/ai";
import { styled, alpha } from "@mui/material/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const UserButton = () => {
  let { t } = useTranslation(["home"]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="mx-2 md:block hidden">
        <div
          onClick={handleClick}
          className="flex justify-between cursor-pointer text-gray-500 active:text-orange-400 transition_normal flex-col items-center"
        >
          <AiOutlineUser className="text-2xl" />
          <p className="text-xs md:pt-1 lg:pt-2 sm:text-sm">{t("sign-in-b")}</p>
        </div>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <Link to={"/signin"}>
            <MenuItem onClick={handleClose}>{t("sign-in-b")}</MenuItem>
          </Link>
          <Divider sx={{ my: 0.5 }} />
          <Link to={"/signup"}>
            <MenuItem onClick={handleClose} disableRipple>
              {t("sign-up")}
            </MenuItem>
          </Link>
        </StyledMenu>
      </div>
      <Link
        to={"/signin"}
        className="md:hidden flex justify-between text-gray-500 active:text-orange-400 transition_normal flex-col items-center"
      >
        <AiOutlineUser className="text-2xl" />
        <p className="text-xs pt-0 sm:text-sm">{t("sign-in-b")}</p>
      </Link>
    </>
  );
};
export default UserButton;
