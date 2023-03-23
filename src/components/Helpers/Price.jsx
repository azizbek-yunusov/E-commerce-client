import React from "react";
import { useTranslation } from "react-i18next";
import { numberWithCommas } from "./numberWithCommas";

const Price = ({ price, className }) => {
  let { t } = useTranslation(["product"]);
  return (
    <p className={`${className}`}>
      {numberWithCommas(price)} {t("currency")}{" "}
    </p>
  );
};

export default Price;
