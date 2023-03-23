import React from "react";
import { useTranslation } from "react-i18next";

const PaymentTypeText = ({ paymentMethod }) => {
  let { t } = useTranslation(["order"]);

  return (
    <div className="">
      {paymentMethod === "Cash on Delivery" ? t("by-cash") : "d"}
    </div>
  );
};

export default PaymentTypeText;
