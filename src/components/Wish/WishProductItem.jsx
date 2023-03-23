import { Rating, Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, decrQtyItemCart } from "../../redux/actions/cartAction";
import { deleteFavoriteItem } from "../../redux/actions/favoriteAction";
import { productUrl } from "../../utils/baseUrls";
import Price from "../Helpers/Price";

const WishProductItem = ({ productId }) => {
  const { _id, name, images, price, ratings, discount } = productId;
  const dispatch = useDispatch();
  const { t } = useTranslation(["product"]);
  const { isLogged, access_token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const existItem = cart?.find((x) => x.productId._id === _id);
  const isCart = existItem === undefined ? false : true;

  const addToCartHandle = async (id) => {
    if (isLogged) {
      const { data } = await axios.get(`${productUrl}${id}`);
      const existItem = cart?.find((x) => x.productId?._id === data._id);

      if (data.inStock <= existItem.quantity) {
        toast.error(t("product-not"));
      } else {
        dispatch(addToCart(id, access_token));
      }
    } else {
      toast.error(t("error-register"));
    }
  };
  return (
    <>
      {typeof productId == "object" ? (
        <div className="overflow-hidden relative flex tranistion_normal hover:shadow-xl flex-col justify-between md:h-[400px] h-[350px] md:border border-gray-200 hover:border-gray-50 md:rounded-xl rounded-md md:p-3 p-2 md:px-4">
          {discount > 0 && (
            <div className="md:px-2 p-[2px] px-1 md:py-1 absolute top-2 left-2 md:text-sm text-xs font-semibold md:rounded-lg rounded bg-red-600 text-white">
              -{discount}
              {"%"}
            </div>
          )}
          <div
            onClick={() => dispatch(deleteFavoriteItem(_id, access_token))}
            className="md:p-2 p-1 absolute md:top-2 top-1 md:right-2 right-1 text-lg  border border-gray-300 cursor-pointer font-semibold rounded-full bg-white transition_normal hover:scale-105 text-gray-700"
          >
            <CgClose />
          </div>
          <div className="md:hidden absolute top-1 right-1"></div>

          <div className="">
            <Link
              to={`/product/view/${_id}`}
              className="flex justify-center items-center"
            >
              <img
                className="md:h-44 h-[140px] object-cover"
                src={images[0].url}
                alt=""
              />
            </Link>
            <div className="w-full mt-1 text-gray-800">
              <h1 className="md:text-base font-semibold global-font">{name}</h1>
            </div>
          </div>
          <div className="w-full text-gray-800">
            {discount > 0 ? (
              <div className="">
                <Price
                  price={price - (price * discount) / 100}
                  className="md:text-lg font-semibold"
                />
                <Price
                  price={price}
                  className="md:text-lg line-through text-gray-400"
                />
              </div>
            ) : (
              <Price price={price} className="md:text-lg font-semibold" />
            )}

            <div className="flex items-center md:mt-2 mt-1">
              <h1 className="text-base text-gray-700 mr-2">
                {ratings?.toFixed(1)}
              </h1>
              <Rating
                icon={<AiFillStar fontSize="20px" />}
                emptyIcon={<AiOutlineStar fontSize="20px" />}
                readOnly
                value={ratings || 0}
              />
            </div>
          </div>
          <div className="w-full flex_betwen md:px-2">
            {isCart ? (
              <div className="w-full flex_betwen">
                <Link
                  to={"/cart"}
                  className="p-[10px] mr-2 hover:border-gray-400 rounded-md text-white bg_secondary"
                >
                  <BsCartCheck className="md:text-xl text-white" />
                </Link>

                <div className="flex_betwen w-full">
                  <div className="flex_betwen md:px-3 border-2 border-[#888888] md:py-[6px] py-[6px] w-full rounded-lg md:text-lg text-base transition_normal hover:border-orange-500">
                    <Tooltip title="remove from cart">
                      <button
                        onClick={() =>
                          dispatch(
                            decrQtyItemCart(
                              existItem.productId._id,
                              access_token
                            )
                          )
                        }
                        className="text-gray-800 md:px-1 pl-3 py-1"
                      >
                        <AiOutlineMinus />
                      </button>
                    </Tooltip>
                    <p className="font-mono md:text-lg text-gray-800 text-base">
                      {existItem.quantity}
                    </p>
                    <Tooltip title="Increase by one">
                      <button
                        onClick={() => addToCartHandle(_id)}
                        className=" tranistion_normal text-gray-800 md:px-1 pr-3 py-1"
                      >
                        <AiOutlinePlus />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => addToCartHandle(_id)}
                className="py-2 flex items-center justify-center w-full rounded-lg bg_secondary text-lg text-white transition_normal hover:opacity-80"
              >
                <FiShoppingCart className="md:text-xl" />
                <span className="ml-2 text-base">{t("addcart")}</span>
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default WishProductItem;
