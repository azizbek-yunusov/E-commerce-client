import React from "react";

const BannerItem = ({ name, image, href }) => {
  return (
    <div className="w-full overflow-hidden cursor-pointer flex justify-start items-center">
      <img
        src={image.url}
        alt={name}
        className="w-full bg-center object-cover lg:h-[385px] md:h-[248px] h-[135px] rounded-xl bg-gray-200"
      />
    </div>
  );
};

export default BannerItem;
