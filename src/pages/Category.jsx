import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategory } from "../redux/category";
import { HelmetTitle } from "../utils";
import { CircularProgress } from "@mui/material";

const Category = () => {
  const { slug } = useParams();
  let { t } = useTranslation(["home"]);
  const { isLoading, category, subCategories } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    dispatch(getCategory({ slug }));
  }, [dispatch, slug]);
  return (
    <main className="container-full min-h-screen">
      <HelmetTitle
        title={t(
          `${
            i18n.language === "oz"
              ? category?.nameOz
              : i18n.language === "uz"
              ? category?.nameUz
              : i18n.language === "ru"
              ? category?.nameRu
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
              ? category?.nameOz
              : i18n.language === "uz"
              ? category?.nameUz
              : i18n.language === "ru"
              ? category?.nameRu
              : null}
          </h1>
          <div className="grid grid-cols-8 gap-x-5">
            <div className="col-span-2">
              {subCategories.map((elem) => (
                <div key={elem._id} className="flex_col cursor-pointer">
                  <p className="font-semibold mt-2 text_color text-lg">
                    {i18n.language === "oz"
                      ? elem.titleOz
                      : i18n.language === "uz"
                      ? elem.titleUz
                      : i18n.language === "ru"
                      ? elem.titleRu
                      : null}
                  </p>
                </div>
              ))}
            </div>
            <div className="col-span-6 grid grid-cols-4 gap-5">
              {subCategories.map((elem) => (
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
                      : i18n.language === "uz"
                      ? elem.titleUz
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
  );
};

export default Category;
