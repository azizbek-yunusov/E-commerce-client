import React from "react";
import { Link } from "react-router-dom";

const BrandItem = ({ id, slug, name, image }) => {
  return (
    <Link
      to={`/manufacturer/${slug}`}
      className="p-2 m-1 bg-white border cursor-pointer border-gray-200 hover:shadow-md hover:border-white ease-in duration-200 lg:rounded-xl md:rounded-3xl rounded-2xl items-center flex flex-col justify-between lg:p-3 md:px-5 py-4 lg:min-w-max min-w-[140px]"
    >
      <img src={image.url} className="md:h-20 h-16 object-cover" alt={name} />
      <p className="normal-case md:text-xl text-lg text-gray-500 font-semibold md:mt-2 mt-1">
        {name}
      </p>
    </Link>
  );
};

export default BrandItem;
