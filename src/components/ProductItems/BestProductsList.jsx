import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";
import { ProductList } from "../SkeletonLoaders";
import { useSelector } from "react-redux";
const BestProductsList = () => {
  const { t } = useTranslation(["product"]);
  const { isLoading, products } = useSelector((state) => state.product);
  return (
    <section>
      {!isLoading ? (
        <section className="container-full md:my-5">
          {products.length ? (
            <div className="">
              <div className="flex_betwen md:mb-8 mb-5">
                <h1 className="lg:text-3xl text-xl font-semibold text-zinc-800">
                  {t("bestp")}
                </h1>
                <Link
                  className="text-orange-600 md:text-lg text-xs font-semibold"
                  to={"/products"}
                >
                  {t("all-views")}
                </Link>
              </div>
              <div className="">
                <div className="col-span-12 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 lg:gap-4 grid-cols-2 gap-3 relative">
                  {products.slice(0, 8).map((item) => (
                    <ProductCard key={item._id} {...item} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>
      ) : (
        <ProductList />
      )}
    </section>
  );
};
export default BestProductsList;
