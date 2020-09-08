import api from "../../utils/api";
import {
  FILTER_FAILED,
  FILTER_SUCCESS,
  MENU_FAILED,
  MENU_SUCCESS,
  ADD_FILTER,
  FILTER_START,
} from "../actionTypes/actionTypes";
import { setAlert } from "./alert";

// Load User
export const loadMenu = () => async (dispatch) => {
  try {
    const res = await api.get("/foods?fields=-_id,-__v");

    dispatch({
      type: MENU_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert("Menu Could not be loaded please refresh the page", "danger"));
    dispatch({
      type: MENU_FAILED,
    });
  }
};

export const addFilter = (name, value) => ({
  type: ADD_FILTER,
  payload: { name, value },
});

export const loadFiltered = (filter) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_START });
    let query = [];
    for (const key in filter) {
      if (filter[key] === true) {
        query.push(`${key}=${filter[key]}`);
      }
    }

    if (filter.category) {
      query.push(`category=${filter.category}`);
    }

    if (filter.sort) {
      query.push(`sort=${filter.sort}`);
    }

    const res = await api.get(`/foods?${query.join("&")}`);

    if (res.data.data.length === 0) {
      dispatch(setAlert("Invalid Filter, Try Different One!", "danger"));
      dispatch(loadMenu());
      return;
    }

    dispatch({
      type: FILTER_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert("Cannot Filter, Try again", "danger"));
    dispatch(loadMenu());
    dispatch({
      type: FILTER_FAILED,
    });
  }
};
