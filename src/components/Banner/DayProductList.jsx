import React from "react";
import DayProductItem from "./DayProductItem";
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from "react-i18next";
import DayTimer from "./DayTimer";

const DayProductList = ({ products }) => {
  const { t } = useTranslation(["product"]);
  const discoundtedProducts = products.filter((item) => item.discount > 0);

  return (
    <div className="h-full pb-2">
      <div className="bg-white md:rounded-md rounded-lg day_gradient_border p-1 h-full my-1 min-h-[188px]">
        <div className="flex_betwen md:px-3 px-2 md:py-2 py-1">
          <h1 className="md:text-lg text-sm">{t("day-product")}</h1>
          <DayTimer />
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          navigation={false}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {discoundtedProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <DayProductItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DayProductList;
