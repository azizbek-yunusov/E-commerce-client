import React from "react";
import { useTranslation } from "react-i18next";
import { BiHomeAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const HomeButton = () => {
  let { t } = useTranslation(["home"]);
  return (
    <Link
      to={"/"}
      className="flex justify-between text-gray-500 active:text-orange-400 transition_normal flex-col items-center"
    >
      <BiHomeAlt className="text-2xl" />
      <p className="text-xs pt-1 sm:text-sm">{t("home")}</p>
    </Link>
  );
};

export default HomeButton;
