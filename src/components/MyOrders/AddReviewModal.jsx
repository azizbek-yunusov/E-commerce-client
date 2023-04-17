import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Rating,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdAddAPhoto, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addReview } from "../../redux/product";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 3,
};

const AddReviewModal = ({ open, handleClose, productId, review }) => {
  let { t } = useTranslation(["product"]);
  const { access_token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");
  const [pictures, setPictures] = useState(review?.pictures || []);

  const reviewsHandle = async (e) => {
    try {
      e.preventDefault();
      if (rating === 0) {
        toast.error(t("rating-feild"));
      } else {
        dispatch(
          addReview({ access_token, productId, rating, comment, pictures })
        );
        handleClose();
        toast.success(t("review-sent-success"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPictures((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const deleteImages = (index) => {
    const newArr = [...pictures];
    newArr.splice(index, 1);
    setPictures(newArr);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style} className="rounded-xl bg-white">
          <div className="flex_betwen">
            <h1 className="text-primary text-gray-800 md:mb-3 mb-2">
              {review !== null ? t("edit-review") : t("new-review")}
            </h1>
            <IconButton
              onClick={handleClose}
              variant="contained"
              size="medium"
              color="default"
            >
              <MdClose />
            </IconButton>
          </div>
          <form onSubmit={reviewsHandle}>
            <div className="flex items-center mb-5">
              <p className="text-gray-700 mr-2">{t("rate")}</p>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(e, newValue) => {
                  setRating(newValue);
                }}
                icon={<AiFillStar fontSize="20px" />}
                emptyIcon={<AiOutlineStar fontSize="20px" />}
              />
            </div>
            <TextField
              fullWidth
              multiline
              label={t("review-comment")}
              minRows={4}
              color="secondary"
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="md:mt-5 mt-3 flex min-w-full bg-gray-50 dark:bg-gray-700/50 justify-center items-center rounded-md border-2 border-dashed border-gray-300 p-3 py-8 cursor-pointer">
              <div className="flex justify-center flex-col items-center">
                <MdAddAPhoto className="text-3xl text-gray-500" />
                <div className="flex text-sm text_color">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium"
                  >
                    <span> {t("upload-image")}</span>
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      className="sr-only"
                      onChange={handleImage}
                    />
                  </label>
                </div>
              </div>
            </div>
            {pictures.length > 0 && (
              <div className="flex md:mt-2 ">
                {pictures.map((img, index) => (
                  <div key={index} className="p-[6px] mx-[2px] relative">
                    <div
                      className="border border-gray-400 overflow-hidden rounded"
                      id="file_img"
                    >
                      <img
                        src={img}
                        alt="images"
                        className="img-thumbnail max-w-[50px] w-full"
                      />
                    </div>
                    <IoMdClose
                      onClick={() => deleteImages(index)}
                      className="absolute text-gray-600 top-0 p-1 border text-2xl border-gray-300 right-0 cursor-pointer rounded-full bg-white"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end mt-5">
              <Button variant="contained" size="medium" type="submit">
                {review !== null ? t("edit-review") : t("add-review")}
              </Button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddReviewModal;
