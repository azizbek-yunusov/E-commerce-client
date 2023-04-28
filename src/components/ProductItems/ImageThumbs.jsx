import "../../assets/styles/swipperThumbs.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";

const ImageThumbs = ({ images }) => {
  const [activeThumb, setActiveThumb] = useState();
  return (
    <>
      <main className="md:block hidden product_detail">
        {images && images[0] && (
          <>
            <Swiper
              loop={true}
              spaceBetween={10}
              modules={[Thumbs]}
              grabCursor={true}
              className="product-images-slider sm:max-h-[500px] sm:max-w-[500px]  border-2 border-gray-300 mb-2 rounded-lg bg-white"
              thumbs={{
                swiper:
                  activeThumb && !activeThumb.destroyed ? activeThumb : null,
              }}
            >
              {images.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={item.url}
                    alt="product images "
                    className="object-cover p-4"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {images.length > 1 ? (
              <Swiper
                onSwiper={setActiveThumb}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                modules={[Pagination, Navigation, Thumbs]}
                className="product-images-slider-thumbs"
              >
                {images.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="rounded-md overflow-hidden"
                  >
                    <div className="product-images-slider-thumbs-wrapper">
                      <img
                        src={item.url}
                        alt="product images"
                        className="object-cover p-2"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
          </>
        )}
      </main>
      <div className="md:hidden block">
        {images && images[0] && (
          <Swiper
            style={{
              "--swiper-navigation-size": "18px",
            }}
            modules={[Pagination]}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index} className=" flex_center">
                <div className="flex_center">
                  <img
                    src={item.url}
                    className="h-80 w-80 object-cover"
                    alt="product-image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
export default ImageThumbs;
