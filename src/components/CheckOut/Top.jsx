import { HiOutlinePhone } from "react-icons/hi";
import Translate from "../Buttons/Translate";
import Logo from "../Helpers/Logo";
import { useTranslation } from "react-i18next";

const Top = () => {
  const { t } = useTranslation(["order"]);
  return (
    <div className="shadow-md">
      <div className="container-full flex justify-between items-center md:py-3 py-2">
        <Logo className={"text-xl font-semibold"} />
        <div className="flex items-center is_mobile">
          <div className="flex_center">
            <p className="mr-1 text-sm">{t("contact-center")}</p>
            <a href="tel:+998945545594" className="mr-5">+998 94 554 55 94</a>
          </div>
          <Translate color={"text-gray-700"} />
        </div>
        <div className="flex items-center is_desktop">
          <HiOutlinePhone className="text_color text-xl" />
          {/* <Translete /> */}
        </div>
      </div>
    </div>
  );
};

export default Top;
