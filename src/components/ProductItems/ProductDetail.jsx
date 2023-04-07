import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Rating, Tab, Tabs, Typography } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ProductDetailLoader } from "../SkeletonLoaders";
import ImageThumbs from "./ImageThumbs";
import Comments from "./Comments";
import { ReviewsBox } from "./ReviewsBox";
import BottomScoll from "./BottomScoll";
import Stock from "../Helpers/Stock";
import AddToWish from "../Helpers/AddToWish";
import { useTranslation } from "react-i18next";
import ShopBox from "./ShopBox";
import NoReviews from "./NoReviews";
import SimilarProducts from "./SimilarProducts";
import HelmetTitle from "../../utils/HelmetTitle";
import { getProduct } from "../../redux/product";
import { features } from "../../data/features";

const ProductDetail = () => {
  let { t } = useTranslation(["product"]);
  const { product, reviews, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const { id } = useParams();
  const descrRef = useRef(null);

  const handleTabsChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleScrollToReviews = async () => {
    if (activeTab === 0) {
      setActiveTab(1);
    }
    await descrRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollToDescr = async () => {
    setActiveTab(0);
    descrRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    dispatch(getProduct(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);
  console.log(product);
  return (
    <main>
      {!isLoading && product ? (
        <section>
          <HelmetTitle title={`${product?.name}`} />
          <BottomScoll product={product} />
          <div className="container-full xl:px-10">
            <Breadcrumbs
              className="md:flex hidden"
              aria-label="breadcrumb"
              sx={{ marginY: "8px" }}
            >
              <Link to={"/"}>{t("home-title")}</Link>
              <Link to={"/category"}>{product?.category}</Link>
              <Typography className="text-xs">{product?.name}</Typography>
            </Breadcrumbs>
            <div className="md:grid grid-cols-1 lg:grid-cols-3 xl:gap-x-5 border-t border-r-gray-400 lg:py-5 py-3">
              <div className="md:bg-transparent  bg-gray-200 rounded-2xl">
                <ImageThumbs images={product.images} />
              </div>
              <div className="block md:my-0 md:px-3 px-0 my-3">
                <div className="flex_betwen">
                  <h1 className="xl:text-3xl md:text-2xl text-2xl  font-semibold text-zinc-700">
                    {product.name}
                  </h1>
                  <div className="is_desktop">
                    <AddToWish productId={product._id} />
                  </div>
                </div>
                <div
                  onClick={handleScrollToReviews}
                  className="cursor-pointer flex items-center mt-2 mb-2"
                >
                  <Rating
                    icon={<AiFillStar fontSize="20px" />}
                    emptyIcon={<AiOutlineStar fontSize="20px" />}
                    readOnly
                    value={product?.ratings || 0}
                  />
                  <span className="text-lg text-gray-700 ml-2">
                    {product.ratings?.toFixed(1)}
                  </span>
                </div>
                <Stock inStock={product.inStock} />
                <div className="main_features w-full lg:mt-4 my-3 lg:px-5">
                  <h1 className="text-gray-600 font-semibold mb-3">
                    {t("main-features")}
                  </h1>
                  <div className="w-full">
                    <ul className="leaders w-full">
                      <li className="text-gray-400 mb-3">
                        <span>{t("brand")}</span>
                        <span className="text-gray-700">{product.brand}</span>
                      </li>
                      {features.slice(0, 6).map((item, index) => (
                        <li key={index} className="text-gray-400 mb-3">
                          <span>{t(`${item.feature}`)}</span>
                          <span className="text-gray-700">null</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h1
                    onClick={handleScrollToDescr}
                    className=" text-blue-600 cursor-pointer font-semibold"
                  >
                    {t("detail-features")}
                  </h1>
                </div>
              </div>
              <ShopBox product={product} />
            </div>
          </div>
          <div className="md:mt-8 mt-3 container-full">
            <Tabs
              textColor="secondary"
              value={activeTab}
              onChange={handleTabsChange}
              aria-label="product details"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#ff8800",
                },
              }}
            >
              <Tab color="secondary" label={t("descr")} />
              <Tab color="secondary" label={t("reviews")} />
            </Tabs>
            <div>
              {activeTab === 0 && (
                <div ref={descrRef} className="md:my-5 my-4 w-10/12">
                  <h1 className="text-lg text-center font-semibold text-gray-700 md:mb-3 mb-2">
                    {product.name}
                  </h1>
                  <div dangerouslySetInnerHTML={{ __html: product.descr }}></div>
                  {/* <p className="md:text-base text-sm leading-6 md:text-zinc-600 text-gray-500">
                    {product.descr}
                  </p> */}
                </div>
              )}
              {activeTab === 1 && (
                <div className="md:my-5 my-4">
                  <h1 className="text-xl font-semibold text-zinc-700 mb-3">
                    {t("reviews")}
                  </h1>
                  <div className="lg:grid md:grid-cols-12 md:gap-x-9 flex flex-col-reverse">
                    <div className="w-full col-span-7">
                      {reviews && reviews[0] ? (
                        <div className="reviews">
                          {reviews &&
                            reviews?.map((review, index) => (
                              <Comments key={index} review={review} />
                            ))}
                        </div>
                      ) : (
                        <NoReviews />
                      )}
                    </div>
                    <div className="w-full col-span-5 flex justify-end">
                      <ReviewsBox />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <SimilarProducts />
        </section>
      ) : (
        <ProductDetailLoader />
      )}
    </main>
  );
};
export default ProductDetail;
