import React, { useState } from "react";
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
import ReplyForm from "./ReplyForm";
import ReplyComments from "./ReplyComments";
import { handeleLoginShow } from "../../redux/actions/authAction";

const Comments = ({ review }) => {
  let { t } = useTranslation(["product"]);
  const dispatch = useDispatch();
  const [isReply, setIsReply] = useState(false);

  const { access_token, user, isLogged, isLoginShow } = useSelector(
    (state) => state.auth
  );

  const likeReviewHandle = async (id) => {
    try {
      if (!isLogged) {
        dispatch(handeleLoginShow());
      } else {
        dispatch(likeReview({ access_token, id }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const unLikeReviewHandle = async (id) => {
    try {
      if (!isLogged) {
        dispatch(handeleLoginShow());
      } else {
        dispatch(unLikeReview({ access_token, id }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showReplyForm = () => {
    setIsReply(!isReply);
  };

  return (
    <>
      {review && (
        <div className="rounded-lg my-4 border_primary md:p-5 p-3 pb-2 w-full">
          <div className="flex justify-between md:pb-3">
            <div className="flex items-center">
              <img
                src={
                  review?.user?.avatar?.url ||
                  "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
                }
                className="w-12 h-12 object-cover bg-cyan-200 rounded-full"
                alt="Avatar"
              />
              <div className="ml-1">
                <h1 className="font-semibold mx-2">
                  {review?.user ? review?.user?.name : t("deleted-user")}
                </h1>
                <p className="text-sm text-zinc-500 mx-2">
                  {review.createdAt
                    ? moment(review?.createdAt).locale("uz-latn").format("LLL")
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Rating
                icon={<AiFillStar fontSize="18px" />}
                emptyIcon={<AiOutlineStar fontSize="18px" />}
                value={review?.rating}
                readOnly
              />
              <p className="md:text-xl mx-2">{review?.rating}</p>
            </div>
          </div>
          <div className="mt-3 md:ml-[60px] text-zinc-700 md:mb-2 md:mr-9">
            <p className="">{review?.comment}</p>
          </div>
          <div className="flex">
            {review?.pictures?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                className="object-cover h-28 bg-gray-100 rounded-md"
                alt="Order"
              />
            ))}
          </div>
          <div className="md:mt-4 mt-2 flex_betwen">
            <div className="flex justify-end">
              <p
                onClick={() => showReplyForm()}
                className="text-gray-600 cursor-pointer text-sm"
              >
                {t("reply")}
              </p>
            </div>
            <div className="flex_betwen md:w-1/6">
              <div className="flex items-center mr-3">
                <IconButton
                  onClick={() => likeReviewHandle(review._id)}
                  size="small"
                >
                  <AiOutlineLike
                    className={`${
                      review?.likes?.includes(user?._id)
                        ? "text-orange-500"
                        : ""
                    } md:text-2xl`}
                  />
                </IconButton>
                <p className="ml-1">{review?.likes?.length}</p>
              </div>
              <div className="flex items-center">
                <IconButton
                  onClick={() => unLikeReviewHandle(review._id)}
                  size="small"
                >
                  <AiOutlineDislike
                    className={`${
                      review?.unLikes?.includes(user?._id)
                        ? "text-orange-500"
                        : ""
                    } md:text-2xl`}
                  />
                </IconButton>
                <p className="ml-1">{review?.unLikes?.length}</p>
              </div>
            </div>
          </div>
          <div className="flex_end">
            {isReply && (
              <ReplyForm review={review} showReplyForm={showReplyForm} />
            )}
          </div>
          <div className="flex_end w-full">
            <ReplyComments review={review} />
          </div>
        </div>
      )}
    </>
  );
};
export default Comments;
