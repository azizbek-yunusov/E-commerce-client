import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { alpha, Menu, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const StyledMenu = styled((props) => (
  <Menu
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
    minWidth: 110,
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

const Translate = ({ color }) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const languages = [
    {
      name: "Uzbekcha",
      lng: "oz",
    },
    {
      name: "Ўзбекча",
      lng: "uz",
    },
    {
      name: "Русский",
      lng: "ru",
    },
  ];
  const handleLangChange = (lng) => {
    i18n.changeLanguage(lng);
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="flex_betwen transition_normal">
        <div
          onClick={handleClick}
          className="flex items-center cursor-pointer text-gray-100"
        >
          <p className={`${color}`}>
            {i18n.language === "oz"
              ? "O'zbekcha"
              : i18n.language === "uz"
              ? "Ўзбекча"
              : i18n.language === "ru"
              ? "Русский"
              : null}
          </p>
          <MdOutlineKeyboardArrowDown className="text-xl" />
        </div>
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
        {languages.map((item, index) => (
          <MenuItem key={index} onClick={() => handleLangChange(item.lng)}>
            <div className="flex items-center justify-between">{item.name}</div>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
export default Translate;
