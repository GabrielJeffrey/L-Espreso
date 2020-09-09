import api from "../../utils/api";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_START,
} from "../actionTypes/actionTypes";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/me?fields=-_id,-__v");

    dispatch({
      type: USER_LOADED,
      payload: res.data.data[0],
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Auth Start
export const authStart = () => ({ type: AUTH_START });

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    dispatch(authStart());

    const response = await api.post("/users/signUp", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data.data,
    });
    dispatch(setAlert("Successfully Registered", "success"));
    dispatch(loadUser());
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    dispatch(authStart());

    const response = await api.post("/users/login", formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.data,
    });
    dispatch(setAlert("Successfully Logged In", "success"));
    dispatch(loadUser());
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    dispatch(authStart());

    await api.get("/users/logout");

    dispatch({
      type: LOGOUT,
    });
    dispatch(setAlert("Succesfully Logged Out", "success"));
    dispatch(loadUser());
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
