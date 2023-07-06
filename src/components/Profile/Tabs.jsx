import { useTranslation } from "react-i18next";

const Tabs = () => {
  let { t } = useTranslation(["user"]);
  return (
    <div className="flex justify-center">
      <div className="w-full flex justify-center items-center xl:-mt-11 md:mt-4 mt-2 rounded-xl bg-[#ffffff4d] backdrop-blur-lg py-3 md:border border-gray-200 md:px-7 sm:px-3">
        <div className="w-full flex justify-between items-center ">
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
            <Tab color="secondary" label={t("descr")} />
            <Tab color="secondary" label={t("reviews")} />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
