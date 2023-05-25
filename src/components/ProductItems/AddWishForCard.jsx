import React from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { addToFavorite, deleteFromFavorite } from "../../redux/favorite";
import { toggleLoginModal } from "../../redux/auth";

const AddWishForCard = ({ id, isFavorite }) => {
  const dispatch = useDispatch();
  const { access_token, isLogged } = useSelector((state) => state.auth);

  const handleAddToWishList = (id) => {
    if (!isLogged) {
      dispatch(toggleLoginModal());
    } else {
      dispatch(addToFavorite({ id, access_token }));
    }
  };

  const handleRemoveToWishItem = (id) => {
    if (!isLogged) {
      dispatch(toggleLoginModal());
    } else {
      dispatch(deleteFromFavorite({ id, access_token }));
    }
  };
  return (
    <div className="hidden md:block md:mr-3">
      {isFavorite ? (
        <IconButton
          onClick={() => handleRemoveToWishItem(id)}
        >
          <BsFillHeartFill className="md:text-[32px] text-2xl text-red-500" />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => handleAddToWishList(id)}
        >
          <BsHeart className="md:text-[32px] text-gray-400" />
        </IconButton>
      )}
    </div>
  );
};

export default AddWishForCard;
