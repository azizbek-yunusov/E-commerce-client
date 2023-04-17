import React from "react";
import PaymentTypeText from "../Helpers/PaymentTypeText";
import OrderStatusText from "../Helpers/OrderStatusText";
import { datePicker } from "../Helpers/datePicker";
import Price from "../Helpers/Price";
import { useTranslation } from "react-i18next";

const OrderInfo = ({ item }) => {
  let { t } = useTranslation(["order"]);

  return (
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
              <PaymentTypeText paymentMethod={item.paymentMethod} />
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
  );
};

export default OrderInfo;
