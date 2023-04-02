import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/post";
import PostCard from "./PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PostList = () => {
  const { posts } = useSelector((state) => state.post);
  let { t } = useTranslation(["home"]);

  return (
    <div className="md:my-5 my-3 container-full">
      <div className="flex_betwen md:mb-4 mb-2">
        <h1 className="md:text-3xl text-lg font-semibold">{t("news")}</h1>
        <Link to={"/posts"} className="text-orange-500 md:text-lg text-xs font-semibold">
          <span>{t("all-views")}</span>
        </Link>
      </div>
      <Swiper
        breakpoints={{
          300: {
            slidesPerView: 1.08,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        slidesPerView={7}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
      >
        {posts.map((item) => (
          <SwiperSlide key={item._id}>
            <PostCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostList;
