import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signOut } from "../../redux/auth";

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
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="md:block hidden text-gray-500">
        <div
          onClick={() => navigate("/profile")}
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
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ "& .MuiMenu-paper": { width: 210, marginTop: 2 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleClose(), navigate("/profile");
          }}
        >
          {t("cabinet")}
        </MenuItem>
        <MenuItem onClick={signOutHandle} sx={{ color: "red" }} disableRipple>
          {t("sign-out")}
        </MenuItem>
      </Menu>
    </>
  );
};
export default AuthButton;
