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
  // 1 star
  const findOne = reviews?.filter((item) => item.rating === 1);

  const onePercentage =
    findOne?.length > 0 ? (findOne?.length * 100) / product?.numOfReviews : 0;
  // 2 star
  const findTwo = reviews?.filter((item) => item.rating === 2);
  const twoPercentage =
    findTwo?.length > 0 ? (findTwo?.length * 100) / product?.numOfReviews : 0;
  // 3 star
  const finThree = reviews?.filter((item) => item.rating === 3);
  const threePercentage =
    finThree?.length > 0 ? (finThree?.length * 100) / product?.numOfReviews : 0;
  // 4 star
  const findFour = reviews?.filter((item) => item.rating === 4);
  const fourPercentage =
    findFour?.length > 0 ? (findFour?.length * 100) / product?.numOfReviews : 0;
  // 5 star
  const findFive = reviews?.filter((item) => item.rating === 5);
  const fivePercentage =
    findFive?.length > 0 ? (findFive?.length * 100) / product?.numOfReviews : 0;

  const ratingStatistics = [
    {
      id: 1,
      percentage: onePercentage,
      number: "1",
    },
    {
      id: 2,
      percentage: twoPercentage,
      number: "2",
    },
    {
      id: 3,
      percentage: threePercentage,
      number: "3",
    },
    {
      id: 4,
      percentage: fourPercentage,
      number: "4",
    },
    {
      id: 5,
      percentage: fivePercentage,
      number: "5",
    },
  ];
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
          <div className="md:my-5 my-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-zinc-700 mr-1">5</span>
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                sx={{ borderRadius: "5px" }}
                value={fivePercentage}
              />
            </Box>
            <span className="text-zinc-700 w-16 text-right">
              {fivePercentage}
              {"%"}
            </span>
          </div>
          <div className="md:my-5 my-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-zinc-700 mr-1">4</span>
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiOutlineStar className="text-gray-400" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                sx={{ borderRadius: "5px" }}
                value={fourPercentage}
              />
            </Box>
            <span className="text-zinc-700 w-16 text-right">
              {fourPercentage}
              {"%"}
            </span>
          </div>
          <div className="md:my-5 my-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-zinc-700 mr-1">3</span>
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiOutlineStar className="text-gray-400" />
              <AiOutlineStar className="text-gray-400" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                sx={{ borderRadius: "5px" }}
                value={threePercentage}
              />
            </Box>
            <span className="text-zinc-700 w-16 text-right">
              {threePercentage}
              {"%"}
            </span>
          </div>
          <div className="md:my-5 my-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-zinc-700 mr-1">2</span>
              <AiFillStar className="text_secondary" />
              <AiFillStar className="text_secondary" />
              <AiOutlineStar className="text-gray-400" />
              <AiOutlineStar className="text-gray-400" />
              <AiOutlineStar className="text-gray-400" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                sx={{ borderRadius: "5px" }}
                value={twoPercentage}
              />
            </Box>
            <span className="text-zinc-700 w-16 text-right">
              {twoPercentage}
              {"%"}
            </span>
          </div>
          <div className="md:my-5 my-3 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-zinc-700 mr-1">1</span>
              <AiFillStar className="text_secondary" />
              <AiOutlineStar className="text-gray-400" />
              <AiOutlineStar className="text-gray-400" />
              <AiOutlineStar className="text-gray-400" />
              <AiOutlineStar className="text-gray-400" />
            </div>
            <Box sx={{ width: "100%", marginX: "6px" }}>
              <LinearProgress
                variant="determinate"
                color="secondary"
                sx={{ borderRadius: "5px" }}
                value={onePercentage}
              />
            </Box>
            <span className="text-zinc-700 w-16 text-right">
              {onePercentage}
              {"%"}
            </span>
          </div>
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
