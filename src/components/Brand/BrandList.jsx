import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import BrandItem from "./BrandItem";

const BrandsList = () => {
  let { t } = useTranslation(["home"]);
  const { brands } = useSelector((state) => state.brand);
  return (
    <div className="container-full md:my-5 my-5 md:pt-10 md:pb-5 py-4">
      <div className="flex_betwen">
        <h1 className="lg:text-3xl text-xl text-gray-800 text-left font-semibold">
          {t("brands")}
        </h1>
        <Link
          to={"/manufacturer"}
          className="md:text-lg hover:underline text-xs transition_normal text-orange-500"
        >
          {t("all-views")}
        </Link>
      </div>
      <div className="lg:grid lg:grid-cols-6 lg:my-5 my-4 lg:gap-5 gap-x-2 flex overflow-x-scroll custom_scroll justify-between">
        {brands.slice(0, 6).map((brand) => (
          <BrandItem key={brand._id} {...brand} />
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
