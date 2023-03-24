import React from "react";
import { useTranslation } from "react-i18next";
import { orderStatusData } from "../../data/OrderTypeData";

const OrderStatusText = ({ status }) => {
  let { t } = useTranslation(["order"]);
  const currentStatus = orderStatusData.filter((item) => {
    return item.value === status;
  });

  return <p className="">{t(`${currentStatus[0].name}`)}</p>;
};

export default OrderStatusText;
