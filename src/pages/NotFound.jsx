import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import NotFoundSvg from "../assets/svg/illustration_404.svg";
import { HelmetTitle } from "../utils";

const NotFound = () => {
  let { t } = useTranslation(["home"]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    <HelmetTitle title={t("page-not-found")} />
    <section className="overflow-hidden">
      <div className="container-full pt-7  min-h-[600px] flex items-center flex-col justify-start">
        <h1 className="md:text-gray-800 my-4 font-semibold text-3xl ">
          {t("page-not-found")}
        </h1>
        <p className="text-gray-400 text-base md:my-3 md:px-[250px] xl:px-[450px] text-center">
          {t("page-not-found-title")}
        </p>
        {/* <img src={NotFoundSvg} className="h-64 lg:h-72" alt="" /> */}
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          color="secondary"
          className="w-48"
          size="large"
          sx={{
            marginY: "20px",
          }}
        >
          {t("go-to-home")}
        </Button>
      </div>
    </section>
    </>
  );
};

export default NotFound;
