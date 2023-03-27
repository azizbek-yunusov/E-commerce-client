import React from "react";
import moment from "moment";
import { IconButton, Rating } from "@mui/material";
import {
  AiFillStar,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineStar,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { likeReview, unLikeReview } from "../../redux/product";

const Comments = ({ review }) => {
  let { t } = useTranslation(["user"]);
  const { reviews, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const likeReviewHandle = async (id) => {
    try {
      dispatch(likeReview({ access_token, id }));
    } catch (err) {
      console.log(err);
    }
  };
  const unLikeReviewHandle = async (id) => {
    try {
      dispatch(unLikeReview({ access_token, id }));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(reviews);
  return (
    <div className="rounded-lg my-4 border_primary md:p-5 p-3 pb-2 w-full">
      <div className="flex justify-between md:pb-3">
        <div className="flex items-center">
          <img
            src={
              review.user?.avatar?.url ||
              "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
            }
            className="w-12 h-12 object-cover bg-cyan-200 rounded-full"
            alt="Avatar"
          />
          <div className="ml-1">
            <h1 className="font-semibold mx-2">
              {review.user ? review.user.name : t("deleted-user")}
            </h1>
            <p className="text-sm text-zinc-500 mx-2">
              {review.createdAt
                ? moment(review.createdAt).locale("uz-latn").format("LLL")
                : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Rating
            icon={<AiFillStar fontSize="18px" />}
            emptyIcon={<AiOutlineStar fontSize="18px" />}
            value={review.rating}
            readOnly
          />
          <p className="md:text-xl mx-2">{review.rating}</p>
        </div>
      </div>
      <div className="mt-3 md:ml-[60px] text-zinc-700 md:mr-9">
        <p className="">{review.comment}</p>
      </div>
      <div className="flex">
        {review?.pictures.map((img, index) => (
          <img
            key={index}
            src={img.url}
            className="object-cover h-28 bg-gray-500"
            alt="Order"
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-gray-500 cursor-pointer">{t("reply")}</p>
        <div className="flex">
          <IconButton
            onClick={() => likeReviewHandle(review._id)}
            size="small"
            sx={{ marginRight: 2 }}
          >
            <AiOutlineLike />
            <span>{review.likes.length}</span>
          </IconButton>
          <IconButton  onClick={() => unLikeReviewHandle(review._id)} size="small">
            <AiOutlineDislike />
            <span>{review.unLikes.length}</span>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default Comments;
