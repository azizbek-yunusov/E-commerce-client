import { useEffect, useState } from "react";
import SideBarPf from "./SideBarPf";
import { useSelector } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import { AiFillCalendar, AiOutlineSetting } from "react-icons/ai";
import moment from "moment";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HelmetTitle } from "../../utils";
import ProfileTabs from "./ProfileTabs";

const LayoutP = ({ children }) => {
  let { t } = useTranslation(["user"]);
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabsChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={t("personal")} />
      {/* Desktop responsive */}
      <div className="container-full min-h-[560px] md:mb-3 md:mt-2 xl:flex flex-col hidden text-gray-800">
        <div className="relative">
          <img
            src="/images/profilebg.jpg"
            className="lg:h-[200px] object-cover w-full rounded-2xl"
            alt=""
          />
          <div className="absolute top-1 right-1">
            <IconButton>
              <AiOutlineSetting className="text-white" />
            </IconButton>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-5 justify-between md:my-2 w-full">
          <div className="col-span-3 sticky top-5">
            <SideBarPf />
          </div>
          <div className="col-span-9 block md:px-12">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="md:my-5">{children}</div>
          </div>
        </div>
      </div>
      {/* Tablet && Mobile responsive */}
      <div className="container-full min-h-[460px] my-5 flex flex-col xl:hidden text-gray-800">
        <div className="rounded-xl border_primary relative pb-3">
          <img
            src="/images/profilebg.jpg"
            className="h-[150px] w-full object-cover rounded-t-xl"
            alt="Bg"
          />
          <div className="flex_col md:flex md:flex-row justify-start md:items-start items-center xl:px-0 px-6">
            <div className="z-40 bg-white dark:bg-purple-800/30 dark:backdrop-blur-sm p-[6px] max-w-max rounded-2xl -mt-14">
              <img
                src={user?.avatar?.url || "/images/profile.png"}
                className="h-32 w-32 z-40 object-cover rounded-xl bg-orange-500"
                alt=""
              />
            </div>

            <div className="absolute top-1 right-1">
              <IconButton>
                <AiOutlineSetting className="text-white" />
              </IconButton>
            </div>
            <div className="md:hidden text-center">
              <h1 className="text-2xl mt-1 mb-2 text-gray-600 dark:text-gray-200 font-semibold">
                {user?.name}
              </h1>
              <p className="flex_center text-gray-400 mb-1">
                <MdLocationOn className="text-xl" />
                Uzbekistan
              </p>
              <p className="flex text-gray-400 ">
                <AiFillCalendar className="text-xl" />
                {moment(user?.createdAt).locale("uz-latn").format("LL")}
              </p>
            </div>
            <div className="md:flex flex-col hidden lg:ml-2">
              <h1 className="text-2xl mt-2 mb-3 text-gray-600 dark:text-gray-200 font-semibold">
                {user?.name}
              </h1>
              <div className="flex">
                <p className="flex text-gray-400 mb-1">
                  <MdLocationOn className="text-xl" />
                  Uzbekistan
                </p>
                <p className="flex text-gray-400 lg:ml-4">
                  <AiFillCalendar className="text-xl" />
                  {moment(user?.createdAt).locale("uz-latn").format("LL")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="lg:my-5 md:my-3 pt-3 border-t md:border-none border-t-gray-200">
          {children}
        </div>
      </div>
    </>
  );
};
export default LayoutP;
