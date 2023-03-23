import { CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEye } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/post";
import { HelmetTitle } from "../../utils";

const PostPage = () => {
  let { t } = useTranslation(["dashboard"]);
  const { isLoading, post } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost({ id }));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <main className="flex_center min-h-screen">
      <HelmetTitle title={`${post?.title}`} />
      {!isLoading && post ? (
        <div className="container-full md:my-5 my-2 relative lg:px-40 md:px-20">
          <div className="w-full flex_center">
            <img
              src={post.image?.url}
              className="h-80 w-full object-cover rounded-lg"
              alt={post.title}
            />
          </div>
          <div className="flex_betwen md:my-5 my-3 text-gray-500">
            <div className="flex_center">
              <BsCalendarDate className="mr-1" />
              <span>{moment(post.createdAt).format("lll")}</span>
            </div>
            <div className="flex_center">
              <AiOutlineEye className="mr-1 text-xl" />
              <span>{post.viewsCount}</span>
            </div>
          </div>
          <h1 className="my-4 font-semibold md:text-4xl text-2xl">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </main>
  );
};

export default PostPage;
