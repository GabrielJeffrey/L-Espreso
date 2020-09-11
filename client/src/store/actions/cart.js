import api from "../../utils/api";
import {
  ADD_CART,
  DECREMENT_CART,
  INCREMENT_CART,
  REMOVE_CART,
  CART_FAILED,
  CART_SUCCESS,
  SAVE_SUCCESS,
  SAVE_FAILED,
} from "../actionTypes/actionTypes";
import store from "../store";
import { setAlert } from "./alert";

export const loadCart = (cart) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SUCCESS,
      payload: cart,
    });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Your Cart Could not be loaded please refresh the page", "danger"));
    dispatch({
      type: CART_FAILED,
    });
  }
};

export const addCart = (dish) => (dispatch) => {
  dispatch({
    type: ADD_CART,
    payload: dish,
  });

  const cart = store.getState().cart.cart;
  dispatch(saveCart(cart));
};

export const removeCart = (dish) => (dispatch) => {
  console.log(dish);
  dispatch({
    type: REMOVE_CART,
    payload: dish,
  });

  const cart = store.getState().cart.cart;
  dispatch(saveCart(cart));
};

export const incrementCart = (dish) => (dispatch) => {
  dispatch({
    type: INCREMENT_CART,
    payload: dish,
  });

  const cart = store.getState().cart.cart;
  dispatch(saveCart(cart));
};

export const decrementCart = (dish) => (dispatch) => {
  dispatch({
    type: DECREMENT_CART,
    payload: dish,
  });

  const cart = store.getState().cart.cart;
  dispatch(saveCart(cart));
};

export const saveCart = (cart) => async (dispatch) => {
  try {
    await api.patch("/users/cart", { cart });

    dispatch({
      type: SAVE_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SAVE_FAILED,
    });
  }
};
