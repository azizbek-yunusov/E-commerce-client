import React from "react";
import { useTranslation } from "react-i18next";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  deleteFavoriteItem,
} from "../../redux/actions/favoriteAction";
import { handeleLoginShow } from "../../redux/actions/authAction";

const AddToWish = ({ productId }) => {
  const { t } = useTranslation(["product"]);
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorite);
  const { access_token, isLogged } = useSelector((state) => state.auth);
  const handleAddToWishList = (id) => {
    if (!isLogged) {
      dispatch(handeleLoginShow());
    } else {
      dispatch(deleteFavoriteItem(id, access_token));
    }
  };

  const handleRemoveToWishItem = (id) => {
    if (!isLogged) {
      dispatch(handeleLoginShow());
    } else {
      dispatch(deleteFavoriteItem(id, access_token));
    }
  };

  const existItemWish = favorites?.find((x) => x.productId._id === productId);
  const isFavorite = existItemWish === undefined ? false : true;
  return (
    <div className="">
      {isFavorite ? (
        <button
          onClick={() => handleRemoveToWishItem(productId)}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsFillHeartFill className="text-3xl text-red-500" />
        </button>
      ) : (
        <button
          onClick={() => handleAddToWishList(productId)}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsHeart className="text-3xl text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default AddToWish;
