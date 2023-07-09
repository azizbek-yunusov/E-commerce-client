import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../Helpers/Logo";
import { about, payments, socials } from "../../data/socials";

export const Footer = () => {
  let { t } = useTranslation(["home"]);

  return (
    <>
      <div className="border-t border-t-gray-300 bg-[#f2f2f2]">
        <div className="container-full md:py-12 py-8">
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-10">
            <div className="">
              <div className="block">
                <Link to={"/"}>
                  <Logo className="text-2xl" />
                </Link>
                <div className="block w-full ">
                  <p className="md:mt-5 mb-3">{t("contact-center")}</p>
                  <a
                    href="tel:+998945545594"
                    className="text-lg font-semibold mb-6 text-zinc-800"
                  >
                    +998 (94) 554 55 94
                  </a>
                  <div className="flex items-center my-5">
                    {socials.map((item, index) => (
                      <a
                        key={index}
                        href={`${item.href}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md text-zinc-700 p-2 text-3xl mx-1.5 hover:text-orange-500"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="block">
              <h1 className="text-xl mb-5 text-orange-500 font-semibold">
                {t("about-info")}
              </h1>
              <ul>
                {about.slice(0, 4).map((item, index) => (
                  <li key={index} className="my-2.5">
                    <Link to={`/${item.name}`}>{t(item.name)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="block mt-5">
              <ul>
                {about.slice(4, 8).map((item, index) => (
                  <li key={index} className="my-2.5">
                    <Link to={`/${item.name}`}>{t(item.name)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <div className="grid grid-cols-3 gap-x-10 gap-y-2 mt-9">
                {payments.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white  hover:bg-gray-200 flex_center w-28 h-14 rounded-xl cursor-pointer"
                  >
                    <a
                      className=""
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.icon}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-t-zinc-300 lg:py-5 pb-10 py-3 mt-4 flex justify-center items-center">
          <span className="text-lg mr-2">Created by:</span>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://azizbek.vercel.app"
            className="text-lg text-violet-900 hover:underline hover:text-slate-600 transition_normal"
          >
            Azizbek Yunusov
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
