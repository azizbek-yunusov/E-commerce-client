import { Box, Button, LinearProgress, Rating } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Review } from "./Review";
import { useTranslation } from "react-i18next";
import { toggleLoginModal } from "../../redux/auth";

export const ReviewsBox = () => {
  let { t } = useTranslation(["product"]);
  const { product, reviews } = useSelector((state) => state.product);
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const findRating = (num) =>
    reviews?.filter((item) => item.rating === num).length;
  const ratingPertange = (num) =>
    findRating(num) > 0 ? (findRating(num) * 100) / product?.numOfReviews : 0;
  const ratings = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="md:max-w-[400px] max-h-[440px] md:p-6 p-5 md:px-8 md:rounded-lg rounded-xl flex justify-between flex-col w-full border_primary">
        <div className="flex md:mt-1 flex-col md:flex-row justify-between">
          <div className="md:text-left text-center">
            <h1 className="text-5xl font-semibold">
              {product?.ratings?.toFixed(1)}
            </h1>
            <p className="text-base text-gray-400 mt-4">
              {product?.numOfReviews}
              {""}
              {t("bassed-on-reviews")}
            </p>
          </div>
          <Rating
            sx={{ marginY: "10px" }}
            icon={<AiFillStar fontSize="26px" />}
            emptyIcon={<AiOutlineStar fontSize="26px" />}
            readOnly
            value={product?.ratings || 0}
          />
        </div>
        <div className="my-3">
          {ratings
            .map((num) => (
              <div
                key={num}
                className="md:my-5 my-3 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <span className="text-zinc-700 mr-1">{num}</span>
                  {ratings.map((rat) => (
                    <AiFillStar
                      key={rat}
                      className={`${
                        rat <= num ? "text_secondary" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Box sx={{ width: "100%", marginX: "6px" }}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    sx={{ borderRadius: "5px" }}
                    value={ratingPertange(num)}
                  />
                </Box>
                <span className="text-zinc-700 w-16 text-right">
                  {ratingPertange(num)}
                  {"%"}
                </span>
              </div>
            ))
            .reverse()}
        </div>
        <div className="w-full">
          {isLogged ? (
            <Review productId={product._id} reviews={reviews} />
          ) : (
            <Button
              variant="contained"
              size="large"
              color="secondary"
              fullWidth
              onClick={() => dispatch(toggleLoginModal())}
            >
              {t("add-review")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
