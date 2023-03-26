import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_AVATAR_REQUEST,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_ABOUT_REQUEST,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_ABOUT_FAIL,
  UPDATE_SKILL_REQUEST,
  UPDATE_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_FAIL,
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL,
  UPDATE_PORTFOLIO_REQUEST,
  UPDATE_PORTFOLIO_SUCCESS,
  UPDATE_PORTFOLIO_FAIL,
  DELETE_PORTFOLIO_REQUEST,
  DELETE_PORTFOLIO_SUCCESS,
  DELETE_PORTFOLIO_FAIL,
  UPDATE_LANGUAGE_REQUEST,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE_FAIL,
  DELETE_LANGUAGE_REQUEST,
  DELETE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update AVATAR
export const updateAvatar = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_AVATAR_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/avatar`,
      userData,
      config
    );

    dispatch({ type: UPDATE_AVATAR_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_AVATAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Banner
export const updateBanner = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BANNER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/banner`,
      userData,
      config
    );

    dispatch({ type: UPDATE_BANNER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update About
export const updateAbout = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ABOUT_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/about`,
      userData,
      config
    );

    dispatch({ type: UPDATE_ABOUT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ABOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Skill
export const updateSkill = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SKILL_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/skills`,
      userData,
      config
    );

    dispatch({ type: UPDATE_SKILL_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_SKILL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Skill
export const deleteSkills = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SKILL_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/delete/skills/${id}`, config);

    dispatch({ type: DELETE_SKILL_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_SKILL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Experience
export const updateExperience = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EXPERIENCE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/experience`,
      userData,
      config
    );

    dispatch({ type: UPDATE_EXPERIENCE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPERIENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Experience
export const deleteExperinces = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXPERIENCE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/delete/experience/${id}`,
      config
    );

    dispatch({ type: DELETE_EXPERIENCE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Education
export const updateEducation = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EDUCATION_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/educations`,
      userData,
      config
    );

    dispatch({ type: UPDATE_EDUCATION_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_EDUCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Education
export const deleteEducations = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EDUCATION_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/delete/educations/${id}`,
      config
    );

    dispatch({ type: DELETE_EDUCATION_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_EDUCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Portfolio
export const updatePortfolio = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PORTFOLIO_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/portfolios`,
      userData,
      config
    );

    dispatch({ type: UPDATE_PORTFOLIO_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PORTFOLIO_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Portfolio
export const deletePortfolios = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PORTFOLIO_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/delete/portfolios/${id}`,
      config
    );

    dispatch({ type: DELETE_PORTFOLIO_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PORTFOLIO_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update Language
export const updateLanguage = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_LANGUAGE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/update/languages`,
      userData,
      config
    );

    dispatch({ type: UPDATE_LANGUAGE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_LANGUAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Language
export const deleteLanguages = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LANGUAGE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/me/delete/languages/${id}`,
      config
    );

    dispatch({ type: DELETE_LANGUAGE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_LANGUAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
