import { Tooltip } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { productUrl } from "../../utils/baseUrls";
import { toggleLoginModal } from "../../redux/auth";
import { addToCart, decrementQtyItem } from "../../redux/cart";

const AddCartForCard = ({ isCart, existId, id, quantity, access_token }) => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.auth);
  const { t } = useTranslation(["product"]);
  const addToCartHandle = async (id) => {
    if (isLogged) {
      const { data } = await axios.get(`${productUrl}${id}`);
      if (data.inStock <= quantity) {
        toast.error(t("product-not"));
      } else {
        await dispatch(addToCart({ id, access_token }));
        if (!isCart) {
          toast.success(t("added-cart"));
        }
      }
    } else {
      dispatch(toggleLoginModal());
    }
  };
  return (
    <div className="w-full">
      {isCart ? (
        <div className="flex_betwen md:px-3 border-2 border-[#888888] md:py-[6px] py-[6px] w-full rounded-lg md:text-lg text-base transition_normal hover:border-blue-500">
          <Tooltip title={t("decr-from-cart")}>
            <button
              onClick={() => dispatch(decrementQtyItem({ id, access_token }))}
              className="text-gray-800 md:px-1 pl-3 py-1"
            >
              <AiOutlineMinus />
            </button>
          </Tooltip>
          <p className="font-mono md:text-lg text-gray-800 text-base">
            {quantity}
          </p>
          <Tooltip title={t("incr-to-cart")}>
            <button
              onClick={() => addToCartHandle(id)}
              className=" tranistion_normal text-gray-800 md:px-1 pr-3 py-1"
            >
              <AiOutlinePlus />
            </button>
          </Tooltip>
        </div>
      ) : (
        <button
          onClick={() => addToCartHandle(id)}
          className="border-2 border-[#ff8800] md:py-2 py-2 flex items-center justify-center w-full rounded-lg bg_secondary text-lg text-white transition_normal"
        >
          <FiShoppingCart className="md:text-xl" />
          <span className="ml-2 ms:text-base text-sm">{t("addcart")}</span>
        </button>
      )}
    </div>
  );
};

export default AddCartForCard;
