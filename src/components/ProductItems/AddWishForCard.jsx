import React from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  deleteFavoriteItem,
} from "../../redux/actions/favoriteAction";
import { handeleLoginShow } from "../../redux/actions/authAction";

const AddWishForCard = ({ id, isFavorite }) => {
  const dispatch = useDispatch();
  const { access_token, isLogged } = useSelector((state) => state.auth);

  const handleAddToWishList = (id) => {
    if (!isLogged) {
      dispatch(handeleLoginShow());
    } else {
      dispatch(addToFavorite(id, access_token));
    }
  };

  const handleRemoveToWishItem = (id) => {
    if (!isLogged) {
      dispatch(handeleLoginShow());
    } else {
      dispatch(deleteFavoriteItem(id, access_token));
    }
  };
  return (
    <div className="hidden md:block z-50">
      {isFavorite ? (
        <button
          onClick={() => handleRemoveToWishItem(id)}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsFillHeartFill className="md:text-[32px] text-2xl text-red-500" />
        </button>
      ) : (
        <button
          onClick={() => handleAddToWishList(id)}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsHeart className="md:text-[32px] text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default AddWishForCard;
