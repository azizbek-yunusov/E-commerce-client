import React from "react";

const BannerLoader = () => {
  return (
    <div className="container-full lg:grid lg:grid-cols-12 block overflow-hidden md:my-4 my-2 gap-0 pb-2">
      <div className="col-span-9 w-full bg-[#dadada] rounded-2xl animate-pulse lg:h-[385px] md:h-[248px] h-[135px] "></div>
      <div className="col-span-3 xl:mx-8 bg-[#dadada] rounded-2xl animate-pulse lg:mx-5 lg:my-0 mt-5 lg:h-[385px] md:h-[248px] h-[188px]"></div>
    </div>
  );
};

export default BannerLoader;
