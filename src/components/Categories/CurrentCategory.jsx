import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HelmetTitle } from "../../utils";

const CurrentCategory = () => {
  const { id } = useParams();
  const { isLoading, currentCategory, items } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  let { t } = useTranslation(["dashboard"]);

  useEffect(() => {
    dispatch(getCategory({ id }));
  }, [dispatch, id]);
  return (
    <main>
    <HelmetTitle
      title={t(
        `${
          i18n.language === "oz"
            ? currentCategory?.nameOz
            : i18n.language === "en"
            ? currentCategory?.nameUz
            : i18n.language === "ru"
            ? currentCategory?.nameRu
            : null
        }`
      )}
    />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <section>
          <h1 className="text-3xl font-semibold text_color mb-8">
            {i18n.language === "oz"
              ? currentCategory?.nameOz
              : i18n.language === "en"
              ? currentCategory?.nameUz
              : i18n.language === "ru"
              ? currentCategory?.nameRu
              : null}
          </h1>
          <div className="grid grid-cols-8 gap-x-5">
            <div className="col-span-2">
              {items.map((elem) => (
                <div key={elem._id} className="flex_col cursor-pointer">
                  <p className="font-semibold mt-2 text_color text-lg">
                    {i18n.language === "oz"
                      ? elem.titleOz
                      : i18n.language === "en"
                      ? elem.titleEn
                      : i18n.language === "ru"
                      ? elem.titleRu
                      : null}
                  </p>
                </div>
              ))}
            </div>
            <div className="col-span-6 grid grid-cols-4 gap-5">
              {items.map((elem) => (
                <div key={elem._id} className="flex_col cursor-pointer">
                  <div className="rounded-xl bg-purple-500 p-5 flex_center">
                    <img
                      src={elem.image.url}
                      className="h-36 object-cover hover:scale-105 transition duration-100 ease-linear"
                      alt="category"
                    />
                  </div>
                  <p className="text-center mt-2 text-lg text_color">
                    {i18n.language === "oz"
                      ? elem.titleOz
                      : i18n.language === "en"
                      ? elem.titleEn
                      : i18n.language === "ru"
                      ? elem.titleRu
                      : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
  </main>
  )
    
};

export default CurrentCategory;
