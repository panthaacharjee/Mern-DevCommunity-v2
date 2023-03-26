import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPost } from "../../../redux/actions/postActions";

const Mypost = () => {
  const dispatch = useDispatch();
  const { loading, myPosts } = useSelector((state) => state.myPosts);
  useEffect(() => {
    dispatch(getMyPost());
  }, [dispatch]);

  return (
    <div>
      {myPosts.map((val, ind) => {
        return <div key={ind}>{val.caption}Mypost</div>;
      })}
    </div>
  );
};

export default Mypost;
