import axios from "axios";
const {
  GET_MY_POST_REQUEST,
  GET_MY_POST_SUCCESS,
  GET_MY_POST_FAIL,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  POST_LIKE_AND_UNLIKE_REQUEST,
  POST_LIKE_AND_UNLIKE_SUCCESS,
  POST_LIKE_AND_UNLIKE_FAIL,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAIL,
} = require("../constants/postConstants");

// Get My Post
export const getMyPost = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_POST_REQUEST });

    const { data } = await axios.get(`/api/v1/my/posts`);
    dispatch({ type: GET_MY_POST_SUCCESS, payload: data.posts });
  } catch (error) {
    dispatch({ type: GET_MY_POST_FAIL, payload: error.response.data.message });
  }
};

// Get ALL Post
export const getAllPost = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_POST_REQUEST });

    const { data } = await axios.get(`/api/v1/get/posts`);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data.posts });
  } catch (error) {
    dispatch({ type: GET_ALL_POST_FAIL, payload: error.response.data.message });
  }
};

// Get Single Post
export const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_POST_REQUEST });

    const { data } = await axios.get(`/api/v1/get/post/${id}`);
    dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create A Post
export const createPosts = (useForm) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/create/post`, useForm, config);

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    // console.log(useForm);
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.response.data.message });
  }
};

// Create A Post
export const likeAndUnlikePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_LIKE_AND_UNLIKE_REQUEST });
    // const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(`/api/v1/post/likeAndunlike/${id}`);

    dispatch({ type: POST_LIKE_AND_UNLIKE_SUCCESS, payload: data });
    // console.log(useForm);
  } catch (error) {
    dispatch({
      type: POST_LIKE_AND_UNLIKE_FAIL,
      payload: error.response.data.message,
    });
  }
};
