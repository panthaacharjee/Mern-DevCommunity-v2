import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import pic from "../../images/profilepng.png";
import JoditEditor from "jodit-react";

const CreatePost = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleSubmit = () => {};

  //Jodit Rich Text Editor
  const [desc, setDesc] = useState();
  const editor = useRef(null);
  const config = {
    buttons: ["print"],
  };
  //Create Post
  const [createPost, setCreatePost] = useState(true);
  return (
    <>
      {isAuthenticated
        ? user.role === "developer" && (
            <>
              <div className="create-post">
                <div>
                  <img src={user.avatar.url} alt="avatar" />
                  <input
                    type="submit"
                    value={`Whats on your mind, ${user.name}?`}
                    onClick={() => setCreatePost(false)}
                  />
                </div>
              </div>
              <div
                className={
                  createPost ? "create-post-box hide" : "create-post-box"
                }
              >
                <form onSubmit={handleSubmit} className="form create-post-form">
                  <span>
                    <RxCross2 onClick={() => setCreatePost(true)} />
                  </span>
                  <div>
                    <label>Caption</label>
                    <JoditEditor
                      ref={editor}
                      value={desc}
                      onChange={(e) => {
                        setDesc(e);
                      }}
                    />
                  </div>
                  <div id="updateImage">
                    <input
                      type="file"
                      name="avatar"
                      multiple
                      accept="image/*"
                    />
                  </div>
                  <input type="submit" />
                </form>
              </div>
            </>
          )
        : null}
    </>
  );
};

export default CreatePost;
