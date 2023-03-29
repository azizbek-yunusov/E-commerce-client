import { TextField } from "@mui/material";
import moment from "moment";
import React from "react";

const ReplyComments = ({ review }) => {
  return (
    <div className="w-11/12">
      {review?.reply?.length
        ? review?.reply?.map((rep, index) => (
            <div
              key={index}
              className="md:my-5 border-b border-b-gray-200 md:pb-3"
            >
              <div className="flex items-center md:mb-3">
                <img
                  src={
                    rep.user?.avatar?.url ||
                    "https://www.ihp.ie/wp-content/uploads/profile-img.jpg"
                  }
                  className="w-12 h-12 object-cover bg-cyan-200 rounded-full"
                  alt="Avatar"
                />
                <div className="ml-1">
                  <h1 className="font-semibold mx-2">
                    {rep?.user ? rep?.user?.name : t("deleted-user")}
                  </h1>
                  <p className="text-sm text-zinc-500 mx-2">
                    {rep?.createdAt
                      ? moment(rep?.createdAt).locale("uz-latn").format("LLL")
                      : ""}
                  </p>
                </div>
              </div>
              <div className="md:mt-2 md:ml-14 text-zinc-700">{rep?.text}</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ReplyComments;
