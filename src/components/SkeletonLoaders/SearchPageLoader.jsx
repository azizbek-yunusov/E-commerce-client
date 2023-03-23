import React from "react";

const SearchPageLoader = () => {
  const products = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <div className="container-full md:my-5 my-3">
      <div className="lg:h-10 mb-5 font-semibold text-gray-700 bg-[#dadada] w-96 animate-pulse rounded-xl"></div>
      <div className="grid grid-cols-12 min-h-[550px] md:gap-x-5">
        <div className="md:col-span-3 xl:block hidden px-2 overflow-y-scroll max-h-screen rounded-xl bg-[#dadada] w-full animate-pulse"></div>
        <div className="md:col-span-9 col-span-12">
          <div className="flex_betwen md:mb-6 mb-4">
            <div className=""></div>
            <div className="flex_betwen">
            <div className="bg-[#dadada] animate-pulse w-28 h-9 rounded-lg mr-3"></div>
              <div className="bg-[#dadada] animate-pulse w-28 h-9 rounded-lg"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 md:gap-4 gap-1">
            {products.map((item, index) => (
              <div
                key={index}
                className="border-2 flex flex-col justify-between p-3 border-[#dadada] rounded-2xl min-h-[400px] max-h-[400px]"
              >
                <div className="bg-[#dadada] w-full animate-pulse h-[200px] rounded-xl"></div>
                <div className="bg-[#dadada] w-full animate-pulse h-[20px] my-1 rounded-md"></div>
                <div className="bg-[#dadada] w-full animate-pulse h-[20px] my-1 rounded-md"></div>
                <div className="bg-[#dadada] w-full animate-pulse h-[50px] my-2 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageLoader;
