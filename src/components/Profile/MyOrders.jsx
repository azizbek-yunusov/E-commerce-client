import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Price from "../Helpers/Price";
import { getMyOrders } from "../../redux/order";
import { datePicker } from "../Helpers/datePicker";
import OrderStatus from "../Helpers/OrderStatus";
import PaymentTypeText from "../Helpers/PaymentTypeText";
import { HelmetTitle } from "../../utils";
import moment from "moment";
import OrderStatusText from "../Helpers/OrderStatusText";

const MyOrders = () => {
  let { t } = useTranslation(["order"]);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, myOrders } = useSelector((state) => state.order);
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (access_token) {
      dispatch(getMyOrders(access_token));
    }
  }, [access_token, dispatch]);
  console.log(myOrders);
  return (
    <LayoutP>
      <HelmetTitle title={`${t("user:my-orders")} - ${t("user:personal")}`} />
      <div className="flex justify-between items-center ">
        <h1 className="md:text-xl font-semibold">{t("all-orders")}</h1>
        <FormControl color="secondary" size="small" sx={{ minWidth: "150px" }}>
          <InputLabel _id="demo-simple-select-label">{t("sorting")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            _id="demo-simple-select"
            MenuProps={{
              disableScrollLock: true,
            }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label={t("sorting")}
          >
            <MenuItem value={""}>{t("all")}</MenuItem>
            <MenuItem value={"Unpaid"}>{t("un-paid")}</MenuItem>
            <MenuItem value={"status"}>{t("active")}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!isLoading ? (
        <div className="">
          {myOrders?.length ? (
            myOrders
              .map((item, index) => (
                <div
                  key={index}
                  className="border border_l rounded-xl md:p-4 p-3 md:my-4 my-3"
                >
                  <div className="sm:flex justify-between items-center block border-b border-b-gray-200 md:pb-4 pb-2">
                    <div className="">
                      <p className="md:text-lg font-bold text-gray-700">
                        {t("order-id")}
                        {" - "}
                        <span className="">
                          {"#"}
                          {item.orderId}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <OrderStatus status={item.orderStatus} />
                      <div className="ml-2">
                        {item.updatedAt ? (
                          <div className="text-gray-600">
                            <span className="mr-1 text-gray-500">
                              {t("updated")}-
                            </span>
                            {moment(item.updatedAt).format("lll")}
                          </div>
                        ) : (
                          <div className="text-gray-600">
                            {moment(item.updatedAt).format("lll")}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-12 grid-cols-1 gap-2">
                    <div className="mt-3 lg:col-span-5 flex_col justify-between ">
                      {item.orderItems.map((ord) => (
                        <div key={ord._id} className="">
                          <div className="flex justify-between">
                            <div className="my-2 flex">
                              <img
                                className={
                                  item.orderItems.length >= 2 ? "h-20" : "h-40"
                                }
                                src={ord.productId.images[0].url}
                                alt=""
                              />
                              <div className="ml-1">
                                <Link
                                  to={`/product/view/${ord.productId._id}`}
                                  className="text-gray-700"
                                >
                                  {ord.productId.name}
                                </Link>
                                <Price
                                  price={ord.productId.price}
                                  className="mt-3 md:text-lg font-semibold text-gray-700"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right cursor-pointer md:mr-3">
                            {(item.orderStatus === "Delivered" || "Done") && (
                              <p className="hover:underline transition_normal text-blue-500">
                                {t("product:add-review")}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* <Review productId={"15"} /> */}
                    </div>
                    <div className="mt-3 lg:col-span-7 lg:text-base text-sm md:border-l border-l-gray-200">
                      <table className="w-full">
                        <tbody>
                          <tr className="flex text-sm w-full">
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800 text-left  block lg:table-cell relative lg:static">
                              {t("order-status")}
                              {":"}
                            </td>
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800  text-left block lg:table-cell relative lg:static">
                              <OrderStatusText status={item.orderStatus} />
                            </td>
                          </tr>
                          <tr className="flex text-sm w-full">
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800 text-left  block lg:table-cell relative lg:static">
                              {t("order-type")}
                              {":"}
                            </td>
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800  text-left block lg:table-cell relative lg:static">
                              <PaymentTypeText
                                paymentMethod={item.paymentMethod}
                              />
                            </td>
                          </tr>
                          <tr className="flex text-sm w-full">
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800 text-left  block lg:table-cell relative lg:static">
                              {t("order-date")}
                            </td>
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800  text-left block lg:table-cell relative lg:static">
                              {datePicker(item.createdAt)}
                            </td>
                          </tr>
                          <tr className="flex text-sm w-full">
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800 text-left  block lg:table-cell relative lg:static">
                              {t("total-payment")}
                              {":"}
                            </td>
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800  text-left block lg:table-cell relative lg:static">
                              <Price price={item.totalPrice} />
                            </td>
                          </tr>
                          <tr className="flex text-sm w-full">
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800 text-left  block lg:table-cell relative lg:static">
                              {t("contact")}
                            </td>
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800  text-left block lg:table-cell relative lg:static">
                              {item.contact || item.email}
                            </td>
                          </tr>
                          <tr className="flex text-sm w-full">
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800 text-left  block lg:table-cell relative lg:static">
                              {t("address")}
                            </td>
                            <td className="w-full p-1 md:p-1 xl:p-2 text-gray-800  text-left block lg:table-cell relative lg:static">
                              {item.shippingAddress.region.slice(0, -5)}
                              {", "}
                              {item.shippingAddress.district.slice(0, -3)}
                              {", "}
                              {item.shippingAddress.street}
                              {", "}
                              {item.shippingAddress.house}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
              .reverse()
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/order.png" alt="cart" className="h-56" />
              <h1 className="text-2xl font-semibold text-gray-700">
                {t("empty-order")}
              </h1>
            </div>
          )}
        </div>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </LayoutP>
  );
};
export default MyOrders;
