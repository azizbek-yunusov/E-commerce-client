import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const NoReviews = () => {
  let { t } = useTranslation(["product"]);

  return (
    <div className="flex items-center rounded-xl bg-gray-50 md:p-3 md:py-8 overflow-hidden">
      <div className="w-1/3 flex_center">
        <img
          src="/images/review.png"
          alt="No review"
          className="h-28 object-cover"
        />
      </div>
      <div className="">
        <h1 className="text-gray-700 font-semibold md:mb-2">
          {t("no-review-title")}
        </h1>
        <p className="text-gray-600 text-sm md:mb-5">{t("no-review-descr")}</p>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ backgroundColor: "white" }}
        >
          {t("no-review-button")}
        </Button>
      </div>
    </div>
  );
};

export default NoReviews;
