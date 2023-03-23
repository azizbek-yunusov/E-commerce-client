import styled from "@emotion/styled";
import {
  alpha,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCategory } from "react-icons/bi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

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
    minWidth: 400,
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

const CatalogButton = () => {
  let { t } = useTranslation(["category"]);
  // const { isLoading, categories } = useSelector((state) => state.category);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const categories = [
    {
      name: "Electronics",
      subcategories: ["Laptops", "Desktops", "Phones", "Tablets"],
    },
    {
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
    },
    {
      name: "Books",
      subcategories: ["Fiction", "Non-fiction", "Children"],
    },
  ];
  return (
    <div className="lg:block hidden">
      <Button
        variant="contained"
        color="secondary"
        className="xl:w-40 w-25"
        size="medium"
        startIcon={<BiCategory />}
        onClick={handleOpenMenu}
      >
        {t("category")}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <List component="nav">
          {categories.map((category, index) => (
            <React.Fragment key={category.name}>
              <ListItemButton onClick={handleToggle}>
                <ListItemText primary={category.name} />
                {open ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <ListItemButton
                      key={subcategory}
                      selected={selectedIndex === subIndex}
                      onClick={() => handleListItemClick(subIndex)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subcategory} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </StyledMenu>
    </div>
  );
};

export default CatalogButton;
