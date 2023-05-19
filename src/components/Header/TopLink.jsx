import React from "react";
import { useTranslation } from "react-i18next";
import Translate from "../Buttons/Translate";
import { HiOutlinePhone } from "react-icons/hi";
import Logo from "../Helpers/Logo";
import { ImLocation } from "react-icons/im";

const TopLink = () => {
  const { t } = useTranslation(["order"]);

  return (
    <div>
      <div className="lg:block hidden tranistion_normal w-full bg_secondary">
        <div className="container-full py-1 flex items-center justify-between">
          <div className="flex justify-between items-center">
            {/* <Link top={"/products"}>
              <button className="rounded-lg px-3 font-semibold py-1 text bg-white text-red-500">
                {"-% "}
                {t("discount")}
              </button>
            </Link> */}
            <div className="flex_center text-white">
              <ImLocation className="text-xl mr-1" />
              <h1 className="text-lg">Uzbekistan</h1>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base text-white font-semibold mr-2">
              {t("contact-center")}
              {": "}
            </p>
            <p className="text-lg mr-5 font-semibold text-white">
              +998 (94) 554 55 94
            </p>
            <Translate />
          </div>
        </div>
      </div>
      <div className="container-full lg:hidden flex_betwen my-1">
        <HiOutlinePhone className="text_color text-xl" />
        <Logo />
        {/* <TransleteD /> */}
      </div>
    </div>
  );
};

export default TopLink;
