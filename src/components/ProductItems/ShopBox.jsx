import { Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  AiOutlineInfoCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsBagCheck, BsCartCheck } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddToWish from "../Helpers/AddToWish";
import Price from "../Helpers/Price";
import { toast } from "react-hot-toast";
import { addToCart, decrQtyItemCart } from "../../redux/actions/cartAction";

const ShopBox = ({ product }) => {
  const { t } = useTranslation(["product"]);
  const { _id, inStock } = product;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { access_token, isLogged } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.favorite);

  const existItem = cart?.find((x) => x.productId?._id === _id);
  const isCart = existItem === undefined ? false : true;
  const existItemWish = favorites?.find((x) => x.productId._id === _id);
  const isFavorite = existItemWish === undefined ? false : true;
  const addToCartHandle = async (id) => {
    if (isLogged) {
      const existItem = cart?.find((x) => x.productId?._id === _id);
      if (inStock <= existItem.quantity) {
        toast.error(t("product-not"));
      } else {
        await dispatch(addToCart(id, access_token));
        toast.success(t("added-cart"));
      }
    } else {
      toast.error(t("error-register"));
    }
  };
  return (
    <div className="flex justify-center md:px-4 col-span-1">
      <div className="md:w-auto w-full">
        <div className="sticky top-28 border_primary rounded-xl w-full">
          <div className="flex flex-col md:p-5 p-3 justify-between xl:w-[380px] lg:w-[300px] w-fulll">
            <div className="flex_betwen mb-2">
              <Price
                price={product.price}
                className="md:text-2xl text-xl font-semibold text-gray-600"
              />
              <AddToWish productId={product._id} />
            </div>
            <div className="mb-3 border-b border-b-gray-200 pb-5">
              <div className="flex_betwen text-gray-500 mb-3">
                <p className="">{t("cultivation-info")}</p>
                <AiOutlineInfoCircle className="text-xl text-gray-500" />
              </div>
              <div className="flex text-gray-700">
                <TbTruckDelivery className="text-4xl mr-2 -mt-2" />
                <div>
                  <p className="font-semibold mb-1">{t("standard-delivery")}</p>
                  <p className="text-zinc-400">{t("standard-delivery-d")}</p>
                </div>
              </div>
            </div>
            <div className="my-3">
              {isCart ? (
                <div className="flex_betwen">
                  <div className="border-2 border-[#ff8800] md:py-3 py-3 flex_betwen w-full rounded-lg text-lg text-gray-700 transition_normal">
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
                        className="text-gray-700 md:px-4 pl-3 py-1 text-2xl"
                      >
                        <AiOutlineMinus />
                      </button>
                    </Tooltip>
                    <p className="font-mono md:text-xl text-gray-800 text-base">
                      {existItem.quantity}
                    </p>
                    <Tooltip title="Increase by one">
                      <button
                        onClick={() => addToCartHandle(_id)}
                        className=" tranistion_normal text-gray-700 md:px-4 pl-3 py-1 text-2xl"
                      >
                        <AiOutlinePlus />
                      </button>
                    </Tooltip>
                  </div>
                  <Link
                    to={"/cart"}
                    className="md:py-[18px] py-3 px-5 ml-3 hover:border-gray-400 rounded-md text-white bg_secondary"
                  >
                    <BsCartCheck className="md:text-xl text-white" />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => addToCartHandle(_id)}
                  className="border-2 border-[#ff8800] md:py-3 py-3 flex items-center justify-center w-full rounded-lg bg_secondary text-lg text-white transition_normal"
                >
                  <FiShoppingCart className="md:text-xl" />
                  <span className="ml-2">{t("addcart")}</span>
                </button>
              )}
            </div>
            <button
              onClick={() => addToCartHandle(_id)}
              className="border-2 border-[#ff8800] md:py-3 py-3 flex items-center justify-center w-full rounded-lg text-lg text-gray-700 transition_normal hover:bg-orange-400 hover:text-white"
            >
              <BsBagCheck className="md:text-xl" />
              <span className="ml-2">{t("buy-now")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBox;
