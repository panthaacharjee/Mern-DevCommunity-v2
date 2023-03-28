import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import JoditEditor from "jodit-react";
import { createPosts } from "../../redux/actions/postActions";
import { toast } from "react-toastify";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, success } = useSelector((state) => state.newPost);

  const [avatar, setAvatar] = useState([]);
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    setAvatar([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setAvatar((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  //Jodit Rich Text Editor
  const [desc, setDesc] = useState("Whats on your mind?");
  const editor = useRef(null);

  //Create Post
  const [createPost, setCreatePost] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("caption", desc);
    const data = {
      caption: desc,
      images: avatar,
    };
    dispatch(createPosts(data));
  };

  // useEffect(() => {
  //   if (success) {
  //     toast(success);
  //   }
  // }, []);

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
                      name="caption"
                      onChange={(e) => {
                        setDesc(e);
                      }}
                    />
                  </div>
                  <div id="updateImage">
                    <input
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={handleChange}
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
