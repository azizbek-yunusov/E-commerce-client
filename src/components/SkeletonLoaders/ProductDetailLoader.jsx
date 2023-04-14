import React from "react";

const ProductDetailLoader = () => {
  return (
    <>
      <div className="container-full md:px-10 animate-pulse">
        <div className="md:grid grid-cols-1 md:grid-cols-3 gap-x-5 border-t  border-r-gray-400 lg:py-5 py-4">
          <div className="col-span-1">
            <div className="bg-[#f3f3f3] h-[450px] rounded-2xl"></div>
            <div className="flex justify-between items-center my-5">
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
              <div className="w-[100px] h-[100px] rounded-lg bg-[#f3f3f3]"></div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full bg-[#f3f3f3] rounded-xl h-12 mb-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-8 my-4"></div>
          </div>
          <div className="col-span-1">
            <div className="w-full h-[450px] border-8 border-[#f3f3f3] rounded-xl px-5 flex flex-col justify-center">
            <div className=" bg-[#f3f3f3] rounded-xl h-10 my-2"></div>
            <div className=" bg-[#f3f3f3] rounded-xl h-10 my-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailLoader;
