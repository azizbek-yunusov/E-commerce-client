import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { replyComment } from "../../redux/product";

const ReplyForm = ({ review, showReplyForm }) => {
  let { t } = useTranslation(["product"]);
  const dispatch = useDispatch();
  const { access_token, user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const reviewReplyHandle = async (id) => {
    try {
      dispatch(replyComment({ access_token, id, text }));
      toast.success("success");
      showReplyForm()
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-11/12 md:mt-4">
      <div className="flex items-center md:mb-3">
        <img
          src={
            user?.avatar?.url ||
            "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
          }
          className="w-11 h-11 object-cover bg-orange-200 rounded-full"
          alt="Avatar"
        />
        <div className="md:ml-3">
          <p className="text-zinc-500">{t("reply-title")}</p>
          <h1 className="font-semibold">
            {user ? user.name : t("deleted-user")}
          </h1>
        </div>
      </div>
      <div className="md:mt-2 float-right w-11/12">
        <TextField
          fullWidth
          multiline
          label={t("review-comment")}
          minRows={2}
          autoFocus
          color="secondary"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex_end md:mt-4">
          <Button
            variant="contained"
            size="medium"
            color="info"
            onClick={() => showReplyForm()}
            sx={{ marginRight: 2 }}
          >
            {t("cancellation")}
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={() => reviewReplyHandle(review._id)}
          >
            {t("send")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReplyForm;
