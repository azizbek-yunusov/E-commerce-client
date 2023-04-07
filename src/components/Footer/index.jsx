import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../Helpers/Logo";
import { about, socials } from "../../data/socials";

export const Footer = () => {
  let { t } = useTranslation(["home"]);

  return (
    <div className="border-t border-t-gray-300">
      <div className="container-full md:py-12 py-0">
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-10">
          <div className="">
            <div className="block">
              <Link to={"/"}>
                <Logo className="text-2xl" />
              </Link>
              <div className="block w-full ">
                <p className="md:mt-5 md:mb-3">{t("contact-center")}</p>
                <a
                  href="tel:+998945545594"
                  className="text-lg font-semibold md:mb-6 text-gray-700"
                >
                  +998 (94) 554 55 94
                </a>
                <div className="flex items-center mt-5">
                  {socials.map((item, index) => (
                    <a
                      key={index}
                      href={`${item.href}`}
                      className="rounded-md bg-zinc-700 p-2 text-2xl mx-2 text-white"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="block">
            <h1 className="text-xl mb-2">{t("about-info")}</h1>
            <ul>
              {about.slice(0, 4).map((item, index) => (
                <li key={index} className="md:my-2">
                  <Link to={`/${item.name}`}>{t(item.name)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="block mt-5">
            <ul>
              {about.slice(4, 8).map((item, index) => (
                <li key={index} className="md:my-2">
                  <Link to={`/${item.name}`}>{t(item.name)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid grid-cols-3 gap-x-6 gap-y-4 h-min mt-9">
            <li className="bg-white px-4 h-16 rounded-md flex justify-center ites cursor-pointer">
              <a
                className=""
                href="https://apelsin.uz/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="80"
                  height="56"
                  src="https://olcha.uz/_nuxt/img/apelsin.93106ae.png"
                  alt="apelsin"
                  className="w-24 h-14 object-contain rounded-sm"
                />
              </a>
            </li>
            <li className="bg-white px-4 h-16 rounded-md flex justify-center ites cursor-pointer">
              <a
                className=""
                href="https://apelsin.uz/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="80"
                  height="56"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAjCAMAAADrNwfvAAAArlBMVEUAAAAAPYcAPocAPYcAO4UAOYUANYYAPocAPIYAPYcAP4YAPIYAP4gAPocAPogAPocAPoUAQnYAOoUAPoYAPYcAPYYAPocAPYYAPocAPocAPYcAPocAPocAPYcAPocAPoUAPocAPYcAPoYAPokAPYYAPocAPocAPYYAPocAPYcAPogAPocAPYcAPof/hgD/gAAAPYgAPYYAPYf/iQD/hwD/igAAO4T/gAAAPof/iAAXwlIsAAAAOHRSTlMA/fmHGikJwSXzeFmnk3TrIAMWgmUP5bh9793Ww2lLQNCccDk0y4xFq2BSLqOVaQa7s5OG5MQeEsvbhOMAAAIkSURBVEjH3ZRpz6IwEIDbUgtF5RBEFA8Q72N9jz3G///HFmZqSMy7yQb5sNnnA5kp7UNnKLA/YQEyoMz25ef9fv/G2vDsguj2ozPXtPz1+b0jF+hY3W7duCryouzGhSz+Z1ffQ85duEYSUf9aja+5IkAOlM0pO7ZzuYDMMVEZZad2riMgPrbb0ZS1fI+lAMSrk5Rirdq51AwQYW02lvFuWUuuYBAcDGlbVyDgCX/E2pI+qXiftUbtwGAax17hOGtU2Yq9Rngq8qnWib3bh6wDQvU3mvJjKFk3jGbAe0z1al+IVzbuIWYj4/0STwHdcWiU5oyNogqDelz64EsWcLuKHT5hFWuOOLhmqAHEVdEqi/MlRX1eIS5odus4sVQ1+tZnLIB549p4nvdGZzK8QL6I5xDR+UiEOBgXTLw0gzW6YODtcnhH8ZOrjhLawF5ksipiTVUuocj0yLiiOr+QK67m5LD60qVs+MDAoycT4USsLFgb19U5F5AaF/6eoi9dEdjKfEFx4zrrXDliq8glhOAzp3GdYPdwbetGwTvVon2HxmP6PZPYhW0UTcWGXLalfckal/V47HjG++NgABaKM+5KKWlcuKPxwo9r4ZbrCige/bIgNS5X9lLhB4yIhZj5kGFj1wDTirKOVxqShPu9OqxKcpySJ8q4ZOL/JJeeCkiaT3VV2BOP9rwfIg5V707stIdbGZ5w5TCo2zFc1m09hGb+ri8Z8RuJv2K4FAf4iAAAAABJRU5ErkJggg=="
                  alt="apelsin"
                  className="w-24 h-14 object-contain rounded-sm"
                />
              </a>
            </li>
            <li className="bg-white px-4 h-16 rounded-md flex justify-center ites cursor-pointer">
              <a
                className=""
                href="https://apelsin.uz/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="80"
                  height="56"
                  src="https://olcha.uz/_nuxt/img/payme.e57aa2a.png"
                  alt="apelsin"
                  className="w-24 h-14 object-contain rounded-sm"
                />
              </a>
            </li>
            <li className="bg-white px-4 h-16 rounded-md flex justify-center ites cursor-pointer">
              <a
                className=""
                href="https://apelsin.uz/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="80"
                  height="56"
                  src="https://olcha.uz/_nuxt/img/click.93445f6.png"
                  alt="apelsin"
                  className="w-24 h-14 object-contain rounded-sm"
                />
              </a>
            </li>
            <li className="bg-white px-4 h-16 rounded-md flex justify-center ites cursor-pointer">
              <a
                className=""
                href="https://apelsin.uz/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="80"
                  height="56"
                  src="https://olcha.uz/_nuxt/img/humo.7dc7e40.jpeg"
                  alt="apelsin"
                  className="w-24 h-14 object-contain rounded-sm"
                />
              </a>
            </li>
            <li className="bg-white px-4 h-16 rounded-md flex justify-center ites cursor-pointer">
              <a
                className=""
                href="https://apelsin.uz/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  width="80"
                  height="56"
                  src="https://olcha.uz/_nuxt/img/logo-paynet.48b4b59.png"
                  alt="apelsin"
                  className="w-24 h-14 object-contain rounded-sm"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-t-zinc-300 lg:py-5 pb-10 py-3 mt-4 flex justify-center items-center">
        <span className="text-lg">© {new Date().getFullYear()}</span>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://azizbek.vercel.app"
          className="text-lg text-zinc-600 hover:underline hover:text-slate-600"
        >
          Azizbek Yunusov
        </a>
      </div>
    </div>
  );
};

export default Footer;
