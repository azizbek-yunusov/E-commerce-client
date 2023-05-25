import { Rating, Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productUrl } from "../../utils/baseUrls";
import Price from "../Helpers/Price";
import { addToCart } from "../../redux/cart";
import { deleteFromFavorite } from "../../redux/favorite";
import { toggleLoginModal } from "../../redux/auth";

const ListProductCard = (props) => {
  const { _id, slug, name, images, price, ratings, discount } = props;
  let { t } = useTranslation(["product"]);
  const { isLogged, access_token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const existItem = cart?.find((x) => x.productId?._id === _id);
  const isCart = existItem === undefined ? false : true;
  const existItemWish = favorites?.find((x) => x._id === _id);
  const isFavorite = existItemWish === undefined ? false : true;

  const addToCartHandle = async (id) => {
    if (isLogged) {
      const { data } = await axios.get(`${productUrl}${id}`);
      if (data.inStock <= existItem.quantity) {
        toast.error(t("product-not"));
      } else {
        await dispatch(addToCart(id, access_token));
        toast.success(t("added-cart"));
      }
    } else {
      toast.error(t("error-register"));
    }
  };

  const addFavoriteHandle = (id) => {
    if (!isLogged) {
      dispatch(toggleLoginModal());
    } else {
      dispatch(addToFavorite({ id, access_token }));
    }
  };

  const deleteFromFavoriteHandle = (id) => {
    if (!isLogged) {
      dispatch(toggleLoginModal());
    } else {
      dispatch(deleteFromFavorite({ id, access_token }));
    }
  };
  return (
    <>
      <div className="grid grid-cols-3 overflow-hidden w-full relative tranistion_normal md:my-2 hover:shadow-xl md:h-[200px] h-[200px] md:border border-gray-200 hover:border-gray-50 md:rounded-xl rounded-md md:p-5 p-3 md:px-4">
        {discount > 0 && (
          <div className="md:px-2 p-[2px] px-1 md:py-1 absolute top-3 left-3 md:text-sm text-xs font-semibold md:rounded-md rounded bg-red-600 text-white">
            -{discount}
            {"%"}
          </div>
        )}
        <div className="md:hidden absolute top-1 right-1">
          {isFavorite ? (
            <button
              onClick={() => deleteFromFavoriteHandle(_id)}
              className="rounded-full border-none border-gray-400 p-1 flex_center"
            >
              <BsFillHeartFill className="text-2xl text-red-500" />
            </button>
          ) : (
            <button
              onClick={() => addFavoriteHandle(_id)}
              className="p-1 rounded-full border-none border-gray-400"
            >
              <BsHeart className="text-2xl text-gray-400" />
            </button>
          )}
        </div>

        <div className="col-span-1 ">
          <Link
            to={`/product/view/${slug}`}
            className="flex justify-center items-center"
          >
            <img
              className="md:h-44 md:w-44 h-32 w-32 object-cover"
              src={images[0].url}
              alt=""
            />
          </Link>
        </div>
        <div className="col-span-2 flex flex-col justify-between md:flex-row md:items-center items-start">
          <div className=" w-full text-gray-800">
            <div className="w-full mt-1">
              <h1 className="md:text-base font-semibold global-font">{name}</h1>
            </div>
            {discount > 0 ? (
              <div className="">
                <Price
                  price={price - (price * discount) / 100}
                  className="md:text-lg font-semibold"
                />
                <Price
                  price={price}
                  className="md:text-lg font-semibold line-through text-gray-500 md:ml-3"
                />
              </div>
            ) : (
              <Price price={price} className="md:text-lg font-semibold" />
            )}

            <div className="flex mt-2">
              <h1 className="text-base text-gray-700 mr-2">
                {ratings?.toFixed(1)}
              </h1>
              <Rating defaultValue={ratings} readOnly />
            </div>
          </div>
          <div className="w-full md:px-2">
            {isCart ? (
              <div className="flex justify-between md:px-3 items-center border-2 border-[#01f736] md:py-[6px] py-1 w-full md:rounded-xl rounded-lg md:text-lg text-base transition_normal hover:border-blue-500">
                <Tooltip title="remove from cart">
                  <button
                    onClick={() =>
                      dispatch(decrQtyItemCart(existItem.productId._id))
                    }
                    className="text-gray-600 px-4 py-1"
                  >
                    <AiOutlineMinus />
                  </button>
                </Tooltip>
                <p className="font-mono md:text-lg text-base">
                  {existItem.quantity}
                </p>
                <Tooltip title="Increase by one">
                  <button
                    onClick={() => addToCartHandle(_id)}
                    className=" tranistion_normal  px-4 py-1"
                  >
                    <AiOutlinePlus />
                  </button>
                </Tooltip>
              </div>
            ) : (
              <button
                onClick={() => addToCartHandle(_id)}
                className="border-2 border-[#ff8800] py-2 flex items-center justify-center w-full rounded-xl hover:text-indigo-600 bg-[#ff8800] text-lg text-white hover:bg-white transition_normal  hover:border-indigo-500"
              >
                <FiShoppingCart className="md:text-xl" />
                <span className="ml-2 text-base">add to cart</span>
              </button>
            )}
            <div className="hidden md:block">
              {isFavorite ? (
                <button
                  onClick={() => deleteFavoriteItem(_id)}
                  className="p-1 rounded-full border-none md:mr-4 border-gray-400"
                >
                  <BsFillHeartFill className="text-lg text-red-500" />
                </button>
              ) : (
                <button
                  onClick={() => addToFavorite(_id)}
                  className="p-1 rounded-full border-none md:mr-4 border-gray-400"
                >
                  <BsHeart className="text-lg text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProductCard;
