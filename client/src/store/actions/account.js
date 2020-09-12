import api from "../../utils/api";
import {
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../actionTypes/actionTypes";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

// Update Start
export const updateStart = () => ({ type: UPDATE_USER_START });

// Update User
export const updateUser = (body) => async (dispatch) => {
  try {
    dispatch(updateStart());

    console.log(body);
    await api.patch("/users/updateMe", body);

    dispatch({
      type: UPDATE_USER_SUCCESS,
    });
    dispatch(setAlert("User Info Updated Successfully", "success"));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;

    if (typeof errors == Array) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }

    dispatch(setAlert(errors.message, "danger"));

    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }
};

// Update Password
export const updatePassword = (body) => async (dispatch) => {
  try {
    dispatch(updateStart());

    await api.patch("/users/updateMyPassword", body);

    dispatch({
      type: UPDATE_USER_SUCCESS,
    });
    dispatch(setAlert("User Password Updated Successfully", "success"));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;

    if (typeof errors == Array) {
      errors.forEach((error) => dispatch(setAlert(error.message, "danger")));
    }

    dispatch(setAlert(errors.message, "danger"));

    dispatch({
      type: UPDATE_USER_FAILED,
    });
  }
};
