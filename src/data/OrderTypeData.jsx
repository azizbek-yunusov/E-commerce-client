import { BsCreditCard2Back } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { SiVisa } from "react-icons/si";

export const paymentMethodData = [
  {
    id: "1",
    name: "by-cash",
    value: "Cash on Delivery",
    icon: <GiMoneyStack className="text-2xl text-green-500 mr-3" />,
  },
  {
    id: "2",
    name: "payme",
    value: "Payme",
    icon: "",
  },
  {
    id: "3",
    name: "uzcard-or-xumo",
    value: "UZCARD or XUMO",
    icon: <BsCreditCard2Back className="text-2xl text-teal-300 mr-3" />,
  },
  {
    id: "4",
    name: "card",
    value: "Through Card",
    icon: <SiVisa className="text-2xl text-blue-500 mr-3" />,
  },
];

export const deliveryTypeData = [
  {
    id: "1",
    name: "delivery-address",
    value: "Delivery address",
  },
  {
    id: "2",
    name: "store-pickup",
    value: "Store pickup",
  },
];

export const orderStatusData = [
  {
    id: "1",
    name: "order-placed",
    value: "Order Placed",
    color: "bg-orange-200 text-orange-500",
  },
  {
    id: "2",
    name: "shipped",
    value: "Shipped",
    color: "bg-blue-200 text-blue-500",
  },
  {
    id: "3",
    name: "cash-by",
    value: "Cash on Delivery",
    color: "bg-green-200 text-green-500",
  },
  {
    id: "4",
    name: "processing",
    value: "Processing",
    color: "bg-teal-200 text-teal-500",
  },
  {
    id: "5",
    name: "dispatched",
    value: "Dispatched",
    color: "bg-pink-200 text-pink-500",
  },
  {
    id: "6",
    name: "cancelled",
    value: "Cancelled",
    color: "bg-red-200 text-red-500",
  },
  {
    id: "7",
    name: "delivered",
    value: "Delivered",
    color: "bg-green-200 text-green-500",
  },
];
