import React, { useEffect } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BannerItem from "./BannerItem";
import DayProductList from "./DayProductList";
import { BannerLoader } from "../SkeletonLoaders";
import { useSelector } from "react-redux";

const BannerCarousel = () => {
  const { isLoading, banners } = useSelector((state) => state.banner);
  const { discountProducts } = useSelector((state) => state.product);
  return (
    <section>
      {!isLoading ? (
        <div className="container-full lg:grid lg:grid-cols-12 block overflow-hidden md:my-4 my-2 gap-0 pb-2">
          <div className="xl:col-span-9 col-span-8 rounded-xl overflow-hidden">
            <Swiper
              style={{
                "--swiper-navigation-size": "18px",
              }}
              breakpoints={{
                300: {
                  modules: [Pagination],
                },
                768: {
                  modules: [],
                },
                1024: {
                  width: 1024,
                  modules: [Pagination, Navigation],
                },
                1280: {
                  width: 1280,
                  modules: [Pagination, Navigation],
                },
              }}
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              spaceBetween={10}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {banners.map((item, index) => (
                <SwiperSlide key={index}>
                  <BannerItem {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="xl:col-span-3 col-span-4 xl:ml-8 lg:ml-5 lg:my-0 mt-5">
            <DayProductList products={discountProducts.slice(0, 5)} />
          </div>
        </div>
      ) : (
        <BannerLoader />
      )}
    </section>
  );
};

export default BannerCarousel;
