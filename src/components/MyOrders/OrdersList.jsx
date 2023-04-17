import React from "react";
import OrderStatus from "../Helpers/OrderStatus";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Price from "../Helpers/Price";
import { IconButton, Rating } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import OrderProduct from "./OrderProduct";
import OrderInfo from "./OrderInfo";

const OrdersList = ({ orders }) => {
  let { t } = useTranslation(["order"]);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  return (
    <div>
      {orders
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
             <OrderProduct item={item} />
             <OrderInfo item={item} />
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default OrdersList;
