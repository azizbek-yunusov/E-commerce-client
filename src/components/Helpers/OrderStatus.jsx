import React from "react";
import { useTranslation } from "react-i18next";
import { BsBagCheckFill, BsCartCheckFill } from "react-icons/bs";
import { orderStatusData } from "../../data/OrderTypeData";

const OrderStatus = ({ status }) => {
  let { t } = useTranslation(["order"]);
  const orderStatus = orderStatusData.find((item) => item.value === status);
  return (
    <div className={`${orderStatus.color} rounded-md px-2`}>
      <p className="">{t(orderStatus.name)}</p>
    </div>
  );
};

export default OrderStatus;
