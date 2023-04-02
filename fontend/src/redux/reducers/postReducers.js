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

export const myPostReducer = (state = { myPosts: [] }, action) => {
  switch (action.type) {
    case GET_MY_POST_REQUEST:
      return {
        loading: true,
        myPosts: [],
      };
    case GET_MY_POST_SUCCESS:
      return {
        loading: false,
        myPosts: action.payload,
      };
    case GET_MY_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload.post,
        success: action.payload.success,
      };
    case CREATE_POST_FAIL:
      return {
        loading: false,

        error: action.payload,
      };
    default:
      return state;
  }
};

export const allPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_ALL_POST_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case GET_ALL_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };
    case GET_ALL_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singlePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_POST_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_SINGLE_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case GET_SINGLE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const likeAndUnlikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_AND_UNLIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_LIKE_AND_UNLIKE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case POST_LIKE_AND_UNLIKE_FAIL:
      return {
        loading: false,

        error: action.payload,
      };
    default:
      return state;
  }
};
