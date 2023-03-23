import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const HelmetTitle = ({ title }) => {
  let { t } = useTranslation(["home"]);
  
  return (
    <Helmet>
      <title data-rh="true">{`${title} — ${t("e-commerce")}`}</title>
    </Helmet>
  );
};

export default HelmetTitle;
