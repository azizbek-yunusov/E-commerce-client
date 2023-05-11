import { Avatar, Badge, Button, Divider, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { signOut } from "../../redux/auth";

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
    marginTop: theme.spacing(2),
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

const AuthButton = () => {
  const { user, isLogged } = useSelector((state) => state.auth);
  let { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutHandle = async () => {
    await dispatch(signOut());
    if (isLogged) {
      navigate("/signin");
    }
    toast.success(t("sign-out"));
  };
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
      <div className="md:block hidden text-gray-500">
        <div
          onClick={handleClick}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={
              user.avatar?.url ||
              "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
            }
            alt={user.name}
            className="bg-orange-500 w-7 h-7 xl:w-8 xl:h-8 object-cover rounded-full"
          />
          <p className="text-xs pt-[2px] sm:text-sm">{t("profile")}</p>
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
          <Link onClick={handleClose} to={"/profile"}>
            <MenuItem>{t("profile")}</MenuItem>
          </Link>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={signOutHandle} sx={{color: "red"}} disableRipple>
            {t("sign-out")}
          </MenuItem>
        </StyledMenu>
      </div>
      <Link
        to={"/profile"}
        className="md:hidden flex justify-between text-gray-500 active:text-orange-400 transition_normal flex-col items-center"
      >
        <div className="flex_center text-xl">
          <img
            src={
              user.avatar?.url ||
              "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
            }
            alt={user.name}
            className="h-8 object-cover w-8 bg-purple-600 rounded-full"
          />
        </div>
        <p className="text-xs pt-1 sm:text-sm">{t("profile")}</p>
      </Link>
    </>
  );
};
export default AuthButton;
