import React, { useState } from "react";
import Price from "../Helpers/Price";
import { Link } from "react-router-dom";
import { IconButton, Rating } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import AddReviewModal from "./AddReviewModal";

const OrderProduct = ({ item }) => {
  let { t } = useTranslation(["order"]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="mt-3 lg:col-span-5 flex_col justify-between ">
      {item.orderItems.map((ord) => (
        <div key={ord._id} className="">
          <div className="flex justify-between">
            <div className="my-2 flex">
              <img
                className={item.orderItems.length >= 2 ? "h-20" : "h-40"}
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
          <div className="flex items-center justify-end md:mr-3">
            {ord.reviewId !== null ? (
              <div onClick={handleOpen} className="flex items-center">
                <p className="mx-1">{t("you-review")}:</p>
                <Rating
                  icon={<AiFillStar fontSize="20px" />}
                  emptyIcon={<AiOutlineStar fontSize="20px" />}
                  readOnly
                  value={ord.reviewId?.rating || 0}
                />{" "}
                <IconButton>
                  <BiPencil className="text-xl" />
                </IconButton>
              </div>
            ) : (
              <button
                onClick={handleOpen}
                className="hover:underline transition_normal text-blue-500"
              >
                {t("product:add-review")}
              </button>
            )}
            {/* {(item.orderStatus === "Delivered" || "Done") && (
                  <p className="hover:underline transition_normal text-blue-500">
                    {t("product:add-review")}
                  </p>
                )} */}
          </div>
          <AddReviewModal
            open={open}
            handleClose={handleClose}
            productId={ord.productId._id}
            review={ord.reviewId}
          />
        </div>
      ))}

      {/* <Review productId={"15"} /> */}
    </div>
  );
};

export default OrderProduct;
