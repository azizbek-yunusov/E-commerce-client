import React from "react";

const ProductDetailLoader = () => {
  return (
    <>
      <div className="container-full md:px-10 animate-pulse">
        <div className="md:grid grid-cols-1 md:grid-cols-3 md:gap-5 border-t  border-r-gray-400 lg:py-5 py-4">
          <div className="col-span-1">
            <div className="bg-[#f3f3f3] h-[450px] w-[470px] rounded-2xl"></div>
            <div className="flex justify-between items-center my-5">
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full bg-[#f3f3f3] rounded-xl h-12 mb-4"></div>
            <div className="w-11/12 bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className="w-10/12 bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className="w-1/2 bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className="w-1/3 bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
          </div>
          <div className="col-span-1">
            <div className="w-full h-[450px] border-8 border-[#f3f3f3] rounded-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailLoader;
