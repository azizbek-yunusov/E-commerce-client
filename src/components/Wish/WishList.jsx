import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WishProductItem from "./WishProductItem";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import MobileTop from "../Helpers/MobileTop";
import { MdClose } from "react-icons/md";
import { HelmetTitle } from "../../utils";
import { clearFavorite } from "../../redux/favorite";

const WishList = () => {
  let { t } = useTranslation(["product"]);
  const { access_token } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.favorite);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cleanWishListHandle = () => {
    try {
      dispatch(clearFavorite(access_token));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <HelmetTitle title={t("wish-list")} />
      <div className="">
        <MobileTop name={t("wish")} list={favorites} items={t("items")} />
        <div className="container-full min-h-[600px]">
          {favorites.length ? (
            <div>
              <div className="w-full md:flex hidden justify-between items-center text-lg md:mt-5 border-b pb-3 border-b-gray-200">
                <h1 className="md:text-2xl font-semibold text-gray-700">
                  {t("wish-list")}
                </h1>
                <div
                  onClick={() => cleanWishListHandle()}
                  className="text-sm cursor-pointer text-gray-500 flex_center"
                >
                  <MdClose className="mr-2 text-2xl p-[2px] mt-1 rounded-full border_l" />
                  {t("clean-wish-list")}
                </div>
              </div>
              <div className="grid md:grid-cols-5 grid-cols-2 md:gap-3 gap-2 md:mt-5 mt-3">
                {favorites.map((item, index) => (
                  <WishProductItem key={index} {...item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="md:min-h-[630px] min-h-[450px] flex justify-center items-start">
              <div className="flex justify-start items-center relative flex-col">
                <img
                  src="/images/wish.png"
                  alt="Shopping bag"
                  className="md:h-80 h-60"
                />
                <h1 className="md:text-2xl text-xl md:mb-5 mb-2 text-gray-600 font-semibold">
                  {t("empty-wish")}
                </h1>
                <h1 className="md:text-lg md:mb-5 mb-3 text-gray-500 text-center">
                  {t("empty-wish-t")}
                </h1>
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  color="secondary"
                >
                  {t("wish-b")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default WishList;
