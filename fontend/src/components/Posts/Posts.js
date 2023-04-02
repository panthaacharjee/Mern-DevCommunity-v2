import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost, likeAndUnlikePost } from "../../redux/actions/postActions";
import CreatePost from "./CreatePost";
import "./Posts.css";
import Loader from "../Loader/Loader";
import SinglePosts from "./SinglePosts";

const Posts = () => {
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);

  // const nowDate = new Date.now().getDate();

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="posts">
          <CreatePost />
          <div className="all-posts-container">
            {posts.map((val, ind) => {
              return <SinglePosts val={val} key={ind} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
