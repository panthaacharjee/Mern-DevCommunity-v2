import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import ImageGallery from "react-image-gallery";
import { BiDotsVerticalRounded, BiCommentMinus } from "react-icons/bi";
import { AiOutlineLike, AiFillLike, AiFillCamera } from "react-icons/ai";
import { likeAndUnlikePost } from "../../redux/actions/postActions";
import Loader from "../Loader/Loader";
import { RxCross2 } from "react-icons/rx";

const SinglePosts = ({ val }) => {
  const dispatch = useDispatch();
  const date = dateFormat(val.createdAt, " dS mmmm, yyyy");
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.posts);

  // SubStr String of Caption
  const [lastIndex, setLastIndex] = useState(300);
  const caption = val.caption.substr(0, lastIndex);

  //LastIndex Count of Comment
  const [commentLastIndex, setCommentLastIndex] = useState(300);

  // Like And Unlike Post
  const [like, setLike] = useState(true);
  const [postLength, setPostLength] = useState(val.likes.length);
  const handleLikePost = (props) => {
    if (props === "like") {
      dispatch(likeAndUnlikePost(val._id));
      setPostLength(postLength + 1);
      setLike(false);
    } else {
      dispatch(likeAndUnlikePost(val._id));
      setPostLength(postLength - 1);
      setLike(true);
    }
  };

  //Coment Hide and Show
  const [commentHide, setCommentHide] = useState(false);

  //Comment Image Handle
  const [commentImage, setCommentImage] = useState();
  const handleChangeCommentImage = (e) => {
    if (e.target.name === "commentImage") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setCommentImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (val.likes.includes(user._id)) {
        setLike(false);
      }
    }
    if (commentImage) {
      alert("selected");
    }
  }, [isAuthenticated, user, commentImage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="all-posts-box">
            <div className="owner-information">
              <div>
                <img src={val.owner.avatar.url} />
                <div>
                  <p>{val.owner.name}</p>
                  <label>{date}</label>
                </div>
              </div>
              <span>
                <BiDotsVerticalRounded />
              </span>
            </div>
            <p
              // className="about-text"
              dangerouslySetInnerHTML={{
                __html: caption,
              }}
            />
            {caption.length > 299 ? (
              lastIndex <= 300 ? (
                <span onClick={() => setLastIndex(val.caption.length)}>
                  Show
                </span>
              ) : (
                <span onClick={() => setLastIndex(300)}>Hide</span>
              )
            ) : null}
            {val.images.length > 0 && (
              <div className="image-gallery">
                <ImageGallery
                  items={val.images}
                  showThumbnails={false}
                  showFullscreenButton={false}
                />
              </div>
            )}
            <div className="like-and-comment-box">
              <div
                style={{
                  padding: "5px 15px",
                  borderBottom: "1px solid #00000061",
                }}
              >
                <p>{postLength} likes</p>
                <p>{val.comments.length} comments</p>
              </div>
              <div>
                {isAuthenticated ? (
                  <>
                    {like === true ? (
                      <label onClick={() => handleLikePost("like")}>
                        <span>
                          <AiOutlineLike />
                        </span>
                        Like
                      </label>
                    ) : (
                      <label onClick={() => handleLikePost("unlike")}>
                        <span>
                          <AiFillLike />
                        </span>
                        Unlike
                      </label>
                    )}

                    <label onClick={() => setCommentHide(true)}>
                      <span>
                        <BiCommentMinus />
                      </span>
                      Comment
                    </label>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {isAuthenticated
            ? commentHide && (
                <div className="comments-container">
                  <div className="comments-box-heading">
                    <RxCross2 onClick={() => setCommentHide(false)} />
                  </div>
                  <div className="comments-box-content">
                    {val.comments.map((comment, ind) => {
                      //Date Format
                      const date = dateFormat(
                        comment.createdAt,
                        " dS mmmm, yyyy"
                      );
                      // SubStr String of Caption
                      const commentDesc = comment.comment.substr(
                        0,
                        commentLastIndex
                      );
                      return (
                        <div key={ind} className="single-comment">
                          <img src={comment.user.avatar.url} />
                          <div>
                            <div className="single-comment-box">
                              <p style={{ fontSize: "15px" }}>
                                {comment.user.name}
                              </p>
                              <span>{date}</span>
                              <p style={{ marginTop: "15px" }}>{commentDesc}</p>
                              {commentDesc.length > 299 ? (
                                lastIndex <= 300 ? (
                                  <span
                                    onClick={() =>
                                      setCommentLastIndex(
                                        comment.comment.length
                                      )
                                    }
                                  >
                                    Show
                                  </span>
                                ) : (
                                  <span
                                    onClick={() => setCommentLastIndex(300)}
                                  >
                                    Hide
                                  </span>
                                )
                              ) : null}
                              <img
                                src="https://www.shutterstock.com/image-vector/keep-simple-business-concept-lightbulbs-600w-489515029.jpg"
                                alt="comment image"
                              />
                              <div>
                                <div>
                                  <button>Like</button>
                                  <button>Reply</button>
                                </div>
                                <span>4 Likes</span>
                              </div>
                            </div>
                            {comment.replies.map((reply, ind) => {
                              return (
                                <div key={ind}>
                                  <img src={reply.user.avatar.url} alt="user" />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="create-comment-box">
                    <img src={user.avatar.url} alt="my image" />
                    <input type="text" placeholder="Add a comment ...." />
                    <div>
                      <input
                        type="file"
                        id="file"
                        onChange={handleChangeCommentImage}
                        name="commentImage"
                      />
                      <label for="file">
                        <AiFillCamera />
                      </label>
                    </div>
                    <button>Comment</button>
                  </div>
                </div>
              )
            : null}
        </>
      )}
    </>
  );
};

export default SinglePosts;
