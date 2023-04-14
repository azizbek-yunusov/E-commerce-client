import React from "react";

const ProductList = () => {
  const products = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  return (
    <div className="container-full col-span-12 grid lg:grid-cols-5 md:grid-cols-3 lg:gap-4 grid-cols-2 gap-3 animate-pulse">
      {products.map((item, index) => (
        <div key={index} className="border-2 flex flex-col justify-between p-3 border-[#dadada] rounded-2xl min-h-[400px] max-h-[400px]">
          <div className="bg-[#dadada] w-full animate-pulse h-[200px] rounded-xl"></div>
          <div className="bg-[#dadada] w-full animate-pulse h-[20px] my-1 rounded-md"></div>
          <div className="bg-[#dadada] w-full animate-pulse h-[20px] my-1 rounded-md"></div>
          <div className="bg-[#dadada] w-full animate-pulse h-[50px] my-2 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
