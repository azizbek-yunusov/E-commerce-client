import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BannerItem = ({ name, image, href }) => {
  return (
    <div className="w-full overflow-hidden cursor-pointer flex justify-start items-center">
      <LazyLoadImage
        src={image.url}
        alt={name}
        effect="blur"
        className="w-full bg-center object-cover lg:h-[385px] md:h-[248px] h-[135px] rounded-xl"
      />
    </div>
  );
};

export default BannerItem;
