import React from "react";
import { MdCheckCircle, MdError } from "react-icons/md";

const OrderChip = () => {
  let inStock = true;
  return (
    <div className="">
      {inStock ? (
        <div className="flex_betwen p-1 md:w-full max-w-max  px-1 text-sm font-semibold rounded-md bg-green-200 text-green-500">
          <MdCheckCircle className="text-green-500 text-xl mr-1" />
          <span>buyurtma berilgan</span>
        </div>
      ) : (
        <div className="flex_betwen p-[2px] w-full px-1 max-w-min text-sm font-semibold rounded-md bg-red-200 text-red-500">
          <MdError className="text-red-500 text-xl mr-1" />
          <span>Yetkalizdi</span>
        </div>
      )}
    </div>
  );
};

export default OrderChip;
