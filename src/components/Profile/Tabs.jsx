import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { tabsProfileData } from "../../data/sidebar";

const Tabs = () => {
  let { t } = useTranslation(["user"]);
  const pathname = useLocation().pathname;
  return (
    <div className="flex justify-center">
      <div className="w-full flex justify-center items-center xl:-mt-11 md:mt-4 mt-2 rounded-xl bg-[#ffffff4d] backdrop-blur-lg py-3 md:border border-gray-200 md:px-7 sm:px-3">
        <div className="w-full flex justify-between items-center ">
          {tabsProfileData.map((item, index) => (
            <Link key={index} to={`${item.path}`}>
              <Button
                variant={pathname === item.path ? "contained" : "text"}
                size="large"
                color={pathname === item.path ? "secondary" : "primary"}
              >
                <div
                  className={`flex items-center ${
                    pathname === item.path ? "" : ""
                  }`}
                >
                  {item.icon}
                  <p className="md:block hidden ml-1">{t(`${item.name}`)}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
