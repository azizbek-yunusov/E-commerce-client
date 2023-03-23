import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import Price from "../Helpers/Price";

const DayProductItem = ({ _id, name, ratings, discount, images, price }) => {
  return (
    <div className="overflow-hidden md:pt-0 pt-2 bg-white lg:px-3 px-2 rounded-b-lg flex lg:flex-col justify-around flex-row md:items-center items-start lg:h-[300px] md:h-[170px] h-[140px]">
      <img
        src={images[0].url}
        className="md:h-40 h-28 object-cover"
        alt={name}
      />
      <div className="w-full">
        <div className="w-full">
          <p className="md:text-lg rounded-sm text_color">{name}</p>
        </div>
        <div className="w-full flex md:mt-1 mt-4">
          <Price
            price={price}
            className="md:text-2xl text-lg mr-2 font-semibold text-gray-700"
          />
          <p className="md:text-2xl flex items-center font-semibold text-gray-700">
            {ratings}
            <BsFillStarFill className="text-orange-400" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DayProductItem;
