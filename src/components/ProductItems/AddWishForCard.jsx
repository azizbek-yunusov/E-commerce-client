import React from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToFavorite, deleteFavoriteItem } from "../../redux/actions/favoriteAction";

const AddWishForCard = ({ id, isFavorite, access_token }) => {
  const dispatch = useDispatch();

  return (
    <div className="hidden md:block">
      {isFavorite ? (
        <button
          onClick={() => dispatch(deleteFavoriteItem(id, access_token))}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsFillHeartFill className="md:text-[32px] text-2xl text-red-500" />
        </button>
      ) : (
        <button
          onClick={() => dispatch(addToFavorite(id, access_token))}
          className="p-1 rounded-full border-none md:mr-4 border-gray-400"
        >
          <BsHeart className="md:text-[32px] text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default AddWishForCard;
