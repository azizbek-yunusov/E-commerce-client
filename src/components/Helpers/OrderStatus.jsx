import React from "react";
import { useTranslation } from "react-i18next";
import { BsBagCheckFill, BsCartCheckFill } from "react-icons/bs";

const OrderStatus = ({ status }) => {
  let { t } = useTranslation(["order"]);
  return (
    <div className="">
      {status === "Shipped" ? (
        <div className="flex_betwen p-1 md:w-full max-w-max  px-1 text-sm font-semibold rounded-md bg-green-200 text-blue-500">
          <BsCartCheckFill className="text-blue-500 text-xl mr-1" />
          <span>{t("shipped")}</span>
        </div>
      ) : (
        "not"
      )}
      <div className=""></div>
    </div>
  );
};

export default OrderStatus;
