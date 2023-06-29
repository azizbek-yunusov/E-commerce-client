import { Tab, Tabs } from "@mui/material";
import { tabsProfileData } from "../../data/sidebar";
import { useTranslation } from "react-i18next";

const ProfileTabs = ({activeTab, handleTabsChange}) => {
  let { t } = useTranslation(["user"]);

  return (
    <div className="flex justify-center">
      <div className="w-full flex justify-center items-center xl:-mt-11 md:mt-4 mt-2 rounded-xl bg-[#ffffff4d] backdrop-blur-lg py-3 md:border border-gray-200 md:px-7 sm:px-3">
        <div className="w-full flex xl:justify-end justify-center items-center ">
          <Tabs
            textColor="secondary"
            value={activeTab}
            onChange={handleTabsChange}
            aria-label="product details"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#ff8800",
              },
            }}
          >
            {tabsProfileData.map((item, index) => (
              <Tab
                sx={{ marginX: "20px" }}
                key={index}
                color="secondary"
                label={t(`${item.name}`)}
              />
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
