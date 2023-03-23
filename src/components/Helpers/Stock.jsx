import React from "react";
import { useTranslation } from "react-i18next";
import { MdCheckCircle, MdError } from "react-icons/md";

const Stock = ({ inStock }) => {
  let {t} = useTranslation(["product"])
  return (
    <>
      {inStock ? (
        <div className="flex_betwen p-[2px] px-1 max-w-min text-sm font-semibold rounded-md bg-green-200 text-green-500">
          <MdCheckCircle className="text-green-500 text-xl mr-1" />
          <span>{t("available")}</span>
        </div>
      ) : (
        <div className="flex_betwen p-[2px] px-1 max-w-min text-sm font-semibold rounded-md bg-red-200 text-red-500">
        <MdError className="text-red-500 text-xl mr-1" />
        <span>{t("unavailable")}</span>
      </div>
      )}
    </>
  );
};

export default Stock;
