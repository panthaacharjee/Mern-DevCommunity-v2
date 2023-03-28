import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPost } from "../../redux/actions/postActions";
import CreatePost from "./CreatePost";
import "./Posts.css";
import Loader from "../Loader/Loader";
import dateFormat from "dateformat";
import ImageGallery from "react-image-gallery";

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
              const date = dateFormat(val.createdAt, " dS mmmm, yyyy");
              // const agoDate = date - nowDate;
              // // console.log(agoDate);

              return (
                <div className="all-posts-box" key={ind}>
                  <div>
                    <img src={val.owner.avatar.url} />
                    <div>
                      <p>{val.owner.name}</p>
                      <p>{date}</p>
                    </div>
                  </div>
                  <h4>{val.caption}</h4>
                  <p>{val.description}</p>
                  <div>
                    <ImageGallery items={val.images} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
