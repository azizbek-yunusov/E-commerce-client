import moment from "moment";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { Link } from "react-router-dom";

const PostCard = ({
  _id,
  title,
  excerpt,
  content,
  createdAt,
  viewsCount,
  slug,
  image,
}) => {
  return (
    <div className="">
      <Link to={`/post/view/${_id}`} className="w-full flex_center tranistion_normal rounded-lg overflow-hidden">
        <img
          src={image?.url}
          className="h-40 w-full object-cover rounded-lg hover:scale-105 transition duration-100 ease-linear"
          alt={title}
        />
      </Link>
      <div className="flex_betwen my-2 text-gray-500">
        <div className="flex_center">
          <BsCalendarDate className="mr-1" />
          <span>{moment(createdAt).format("lll")}</span>
        </div>
        <div className="flex_center">
          <AiOutlineEye className="mr-1 md:text-xl" />
          <span>{viewsCount}</span>
        </div>
      </div>
      <Link
        to={`/post/view/${_id}`}
        className=" to-zinc-700 font-semibold lg:text-lg hover:text-orange-500 tranistion_normal"
      >
        <p className="mb-1">{title}</p>
      </Link>
      <p className="text-zinc-500 mb-2 md:text-base text-sm">{excerpt.slice(0, 120)}...</p>
    </div>
  );
};

export default PostCard;
