import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

const SimilarProducts = () => {
  let { t } = useTranslation(["product"]);
  const { isLoading, products } = useSelector((state) => state.product);
  return (
    <>
      {products.length ? (
        <div className="container-full md:my-5">
          <h1 className="md:text-2xl mb-6">{t("simillar-products")}</h1>
          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 1.9,
                spaceBetween: 5,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            slidesPerView={7}
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
};

export default SimilarProducts;
