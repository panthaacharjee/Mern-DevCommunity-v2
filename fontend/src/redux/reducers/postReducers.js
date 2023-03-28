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
        loading: true,
        ...state,
      };
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
        success: action.payload,
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
