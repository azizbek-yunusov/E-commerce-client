import { BiCheck, BiPhone, BiShieldQuarter, BiUser } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { MdLanguage } from "react-icons/md";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LayoutP from "../components/Profile/LayoutP";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { standart } = useSelector((state) => state.address);
  let { t } = useTranslation(["user"]);
  return (
    <LayoutP>
        <div className="md:grid grid-cols-6 gap-x-5 md:my-0 my-5">
          <div className="col-span-2 md:col-span-3 bg-white border_l rounded-lg p-5">
            <h1 className="text-gray-600 md:text-lg font-semibold mb-2">
              {t("profile-data")}
            </h1>
            <ul className="border-t border-t-gray-200">
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <BiUser className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("full-name")}:
                </span>
                {user?.lastName
                  ? `${user?.name} ${user?.lastName}`
                  : user?.name}
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <GoMail className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("email")}:
                </span>
                {user?.email}
              </li>
              <li className="text-zinc-500 dark:text-green-400 my-3 flex items-center">
                <BiCheck className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("joined")}:
                </span>
                {"active"}
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <BiShieldQuarter className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  Role:
                </span>
                Client
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <BiPhone className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("phone-number")}:
                </span>
                {"+998 "}
                {user?.phoneNumber}
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <MdLanguage className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("address")}:
                </span>
                {standart?.region.slice(0, -5)}
                {", "}
                {standart?.district.slice(0, -3)}
                {", "}
                {standart?.street}
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-3 bg-white border_l rounded-lg p-5">
            <h1 className="text-gray-600 md:text-lg font-semibold mb-2">
              {t("shop-data")}
            </h1>
            <ul className="border-t border-t-gray-200">
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <BiUser className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("full-name")}:
                </span>
                {user?.lastName ? `${user?.name} ${user?.lastName}` : user?.name}
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <GoMail className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("email")}:
                </span>
                {user?.email}
              </li>
              <li className="text-zinc-500 dark:text-green-400 my-3 flex items-center">
                <BiCheck className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("joined")}:
                </span>
                {"active"}
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <BiShieldQuarter className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  Role:
                </span>
                Client
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <BiPhone className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("phone-number")}:
                </span>
                {"+998 "}
                {user?.phoneNumber}
              </li>
              <li className="text-zinc-500 dark:text-zinc-400 my-3 flex items-center">
                <MdLanguage className="mr-1 text-lg" />
                <span className="text-zinc-500 font-semibold dark:text-zinc-100 mr-2">
                  {t("address")}:
                </span>
                {standart?.region.slice(0, -5)}
                {", "}
                {standart?.district.slice(0, -3)}
                {", "}
                {standart?.street}
              </li>
            </ul>
          </div>
        </div>
      </LayoutP>
  )
}

export default Profile