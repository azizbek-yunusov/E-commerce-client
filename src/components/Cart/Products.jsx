import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AiOutlineHeart, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Price from "../Helpers/Price";
import { addToCart, decrementQtyItem, deleteFromCart } from "../../redux/cart";
import { deleteFromFavorite } from "../../redux/favorite";
import { discPriceCalc } from "../../utils/discountPriceCalc";
import { checkPromoCode, clearPromo } from "../../redux/order";
import { useState } from "react";
import { MdDiscount } from "react-icons/md";
import { momentDate } from "../../utils/momentDate";

const Products = ({ cart }) => {
  const { access_token, isLogged } = useSelector((state) => state.auth);
  const { isError, message, promo } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  let { t } = useTranslation(["product"]);

  const addToCartHandle = async (id) => {
    if (isLogged) {
      dispatch(addToCart({ id, access_token }));
    } else {
      toast.error(t("error-register"));
    }
  };
  const deleteFromCartHandle = async (id) => {
    if (isLogged) {
      dispatch(deleteFromCart({ id, access_token }));
    } else {
      toast.error(t("error-register"));
    }
  };
  const decrementQtyItemHandle = async (id) => {
    if (isLogged) {
      dispatch(decrementQtyItem({ id, access_token }));
    } else {
      toast.error(t("error-register"));
    }
  };
  const handleCheckPromoCode = (code) => {
    if (!code) {
      setError("code-feild");
    } else {
      dispatch(checkPromoCode({ access_token, code }));
      setError("");
    }
  };
  const handleClearPromo = () => {
    dispatch(clearPromo());
    setCode("");
  };
  return (
    <>
      <div className="container-full grid md:grid-cols-12 lg:gap-x-5 gap-y-3">
        <div className="lg:col-span-8 col-span-12">
          <div className="md:border border-gray-200 md:p-0 xl:p-5 md:rounded-2xl">
            <div className="md:flex hidden md:p-4 xl:p-0 justify-between items-center font-semibold text-gray-700">
              <h1 className="md:text-2xl">{t("cart")}</h1>
              <h1 className="md:text-xl text-gray-500">
                {cart.length} {t("product")}
              </h1>
            </div>
            <div>
              {cart && cart[0]
                ? cart.map((item, index) => (
                    <div
                      key={index}
                      className="xl:p-1 my-2 md:border-t border-t-gray-200"
                    >
                      <div className="grid grid-cols-12 lg:py-3 py-1 xl:px-1 ease-in-out duration-300 border-b-0 border-b-gray-200">
                        <div className="col-span-12 md:col-span-7 flex justify-start">
                          <div className="overflow-hidden border-0 border-gray-300 py-1 rounded-xl">
                            <img
                              src={item.productId?.images[0].url}
                              alt={""}
                              className="object-cover md:h-28 md:w-28 w-20 h-20 object-center"
                            />
                          </div>
                          <div className="md:ml-4 ml-1 flex flex-col md:justify-between justify-around">
                            <p className="text-base text-gray-800 ">
                              {item.productId?.name}
                            </p>
                            <div className="flex">
                              <Price
                                price={discPriceCalc(
                                  item.productId.price,
                                  item.productId.discount
                                )}
                                className="font-semibold md:flex hidden text-lg text-gray-800"
                              />
                              {item.productId.discount > 0 && (
                                <Price
                                  price={item.productId.price}
                                  className="font-semibold md:flex hidden text-lg text-gray-400 ml-2 line-through"
                                />
                              )}
                            </div>
                            <Price
                              price={
                                item.quantity *
                                discPriceCalc(
                                  item.productId.price,
                                  item.productId.discount
                                )
                              }
                              className="font-semibold md:hidden flex text-sm text-gray-800"
                            />

                            <div className="md:flex hidden">
                              <button
                                onClick={() =>
                                  deleteFromCartHandle(item.productId?._id)
                                }
                                className="flex items-center text-base text-red-500"
                              >
                                <HiOutlineTrash className="md:text-xl" />
                                {"  "}
                                {t("delete")}
                              </button>
                              <span className="text-gray-600 md:mx-2">|</span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    deleteFromFavorite(
                                      item.productId?._id,
                                      access_token
                                    )
                                  )
                                }
                                className="flex items-center text-base text-blue-500"
                              >
                                <BsHeart className="md:text-lg mr-1" />
                                {"  "}
                                {t("add-wish")}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-5 col-span-12 w-full flex_betwen">
                          <div className="md:w-auto w-full flex md:justify-start items-end justify-end">
                            <div className="md:flex hidden items-center w-max md:justify-center justify-between h-min rounded-md border-2 border-gray-300">
                              {item.quantity > 1 ? (
                                <button
                                  onClick={() =>
                                    decrementQtyItemHandle(item.productId?._id)
                                  }
                                  className="px-2 py-1"
                                >
                                  <AiOutlineMinus />
                                </button>
                              ) : (
                                <button className="px-2 py-1 text-gray-400">
                                  <AiOutlineMinus />
                                </button>
                              )}
                              <p className="mx-4 py-1 font-mono text-lg">
                                {item.quantity}
                              </p>
                              <button
                                onClick={() => {
                                  addToCartHandle(item.productId?._id);
                                }}
                                className="px-2 py-1"
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                            <div className="md:hidden flex items-center w-max md:justify-center justify-between h-min rounded-md border-2 border-gray-300">
                              {item.quantity > 1 ? (
                                <button
                                  onClick={() =>
                                    decrementQtyItemHandle(item.productId?._id)
                                  }
                                  className="px-2 py-1"
                                >
                                  <AiOutlineMinus />
                                </button>
                              ) : (
                                <button className="px-2 py-1 text-gray-400">
                                  <AiOutlineMinus />
                                </button>
                              )}
                              <p className="mx-4 py-1 font-mono text-lg">
                                {item.quantity}
                              </p>
                              <button
                                onClick={() => {
                                  addToCartHandle(item.productId?._id);
                                }}
                                className="px-2 py-1"
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </div>
                          <div className="h-full flex md:justify-start justify-end items-center md:mt-0 mx-1 mt-2">
                            <Price
                              price={discPriceCalc(
                                item.productId.price,
                                item.productId.discount
                              )}
                              className="xl:text-2xl md:text-base md:flex hidden font-semibold text-gray-700"
                            />
                            <div
                              className="md:hidden
                           flex justify-between items-center h-full"
                            >
                              <button
                                onClick={() =>
                                  dispatch(
                                    deleteFromFavorite(
                                      item.productId?._id,
                                      access_token
                                    )
                                  )
                                }
                                className="flex items-center text-base mx-4 text-gray-400"
                              >
                                <AiOutlineHeart className="text-[26px]" />
                              </button>
                              <button
                                onClick={() =>
                                  deleteFromCartHandle(item.productId?._id)
                                }
                                className="flex items-center text-base text-red-500"
                              >
                                <HiOutlineTrash className="text-[26px]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="lg:sticky lg:top-28 border border-gray-200 p-5 md:rounded-2xl rounded-xl">
            <div className="flex justify-between md:px-2 xl:px-3 items-center mb-5 xl:border-b-2 border-b border-b-gray-200">
              <h1 className="md:text-xl xl:text-2xl mb-5 text-gray-700 font-bold">
                {t("total")}
              </h1>
              <div className="flex_betwen mb-5">
                {promo?.status === "active" ? (
                  <div className="flex ">
                    <MdDiscount className="text-red-500" />

                    <Price
                      price={cart.reduce(
                        (a, c) =>
                          a +
                          discPriceCalc(
                            c.productId.price,
                            c.productId.discount + promo.discount
                          ) *
                            c.quantity,
                        0
                      )}
                      className="md:text-xl xl:text-2xl  text-gray-700 font-bold"
                    />
                  </div>
                ) : (
                  <Price
                    price={cart.reduce(
                      (a, c) =>
                        a +
                        discPriceCalc(c.productId.price, c.productId.discount) *
                          c.quantity,
                      0
                    )}
                    className="md:text-xl xl:text-2xl  text-gray-700 font-bold"
                  />
                )}
              </div>
            </div>
            <div className="">
              <div className="border-2 border-[#ff8400] flex justify-between items-center overflow-hidden rounded-lg">
                <input
                  type="number"
                  value={code}
                  required
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 text-base py-2"
                  placeholder={t("promo-code")}
                />
                {promo ? (
                  <button
                    onClick={() => handleClearPromo()}
                    className="my-[2px] flex px-10 h-full py-[10px] rounded-md mx-[2px] bg-red-500 text-white"
                  >
                    <span>{t("delete")}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckPromoCode(code)}
                    className="my-[2px] flex px-10 h-full py-[10px] rounded-md mx-[2px] bg_secondary text-white"
                  >
                    <span>{t("verify")}</span>
                  </button>
                )}
              </div>
              {error ? (
                <p className="text-red-600 text-sm">{t(error)}</p>
              ) : null}
            </div>
            <div className="mt-5">
              <ul className="flex justify-between items-center space-y-2 text-gray-700">
                <li className="">
                  {promo === null ? null : promo.status === "active" ? (
                    <span className="text-green-500 font-semibold">
                      {t("promocode-active")}
                    </span>
                  ) : promo.status === "expired" ? (
                    <span className="text-red-500 font-semibold">
                      {t("promocode-expired")}
                    </span>
                  ) : promo.status === "used" ? (
                    <span className="text-yellow-500 font-semibold">
                      {t("promocode-used")}
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      {t("error")}
                    </span>
                  )}
                  {isError && (
                    <span className="text-red-500">{t(message)}</span>
                  )}
                </li>
                <li className="">
                  {promo === null ? null : promo.status === "active" ? (
                    <span className="text-green-500 font-semibold">
                      {promo.discount}%
                    </span>
                  ) : promo.status === "expired" ? (
                    <span className="text-red-500 font-semibold">
                      {t("promocode-expired")}
                    </span>
                  ) : promo.status === "used" ? (
                    <span className="text-red-500 font-semibold">
                      {momentDate(promo.updatedAt)}
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      {t("error")}
                    </span>
                  )}
                </li>
              </ul>
              <ul className="flex justify-between items-center text-gray-700">
                <li className="md:text-lg"> {t("delivery")}</li>
                <li className="md:text-lg">{t("free")}</li>
              </ul>
            </div>
            <div className="mt-5">
              <Link to={"/check-out"}>
                <Button
                  className="w-full tracking-wide font-normal"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  {t("check-out-btn")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
