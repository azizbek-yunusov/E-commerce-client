import React from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { BiEdit } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HelmetTitle } from "../../utils";
import LayoutP from "./LayoutP";
import { signOut } from "../../redux/auth";

const Settings = () => {
  let { t } = useTranslation(["user"]);
  const {isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutHandle = async () => {
    await dispatch(signOut());
    if (isLogged) {
      navigate("/signin");
    }
    toast.success("Sign out ");
  };
  return (
    <LayoutP>
      <HelmetTitle title={`${t("settings")} - ${t("personal")}`} />
      <div className="grid grid-cols-2 md:gap-8 gap-4 mt-5 md:px-32 h-full">
        <div className="col-span-1 rounded-xl shadow-lg shadow-indigo-500/50 bg-purple-500 h-32">
          <Link
            to={"/profile/update"}
            className="text-xl w-full flex_center h-full flex_center text-gray-50"
          >
             <BiEdit className="text-2xl mr-2" />
            {t("edit")}
          </Link>
        </div>
        <div
          onClick={signOutHandle}
          className="col-span-1 cursor-pointer rounded-xl shadow-lg shadow-red-500/50 text-xl text-gray-50 bg-red-500 h-32 flex_center"
        >
          <MdLogout className="text-2xl mr-2" />
          <span className="">{t("sign-out")}</span>
        </div>
      </div>
    </LayoutP>
  );
};

export default Settings;
