import {
  ADD_CART,
  DECREMENT_CART,
  INCREMENT_CART,
  REMOVE_CART,
  SAVE_SUCCESS,
  SAVE_FAILED,
  CART_SUCCESS,
  CART_FAILED,
} from "../actionTypes/actionTypes";

const initialState = {
  cart: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_SUCCESS:
      return {
        ...state,
        cart: payload,
      };
    case CART_FAILED:
      return {
        ...state,
        cart: null,
      };

    case ADD_CART:
      const newCart = [...state.cart];
      const index = newCart.indexOf(payload);
      if (index >= 0) {
        return state;
      } else {
        newCart.push(payload);
        return {
          ...state,
          cart: newCart,
        };
      }
    case REMOVE_CART:
      const newCart1 = [...state.cart];
      const index1 = newCart1.indexOf(payload);
      newCart1.splice(index1, 1);
      return {
        ...state,
        cart: newCart1,
      };
    case INCREMENT_CART:
      const newCart2 = [...state.cart];
      const index2 = newCart2.indexOf(payload);
      console.log(newCart2[index2].quantity);
      newCart2[index2].quantity++ ;
      return {
        ...state,
        cart: newCart2,
      };
    case DECREMENT_CART:
      const newCart3 = [...state.cart];
      const index3 = newCart3.indexOf(payload);
      newCart3[index3].quantity--;
      if (newCart3[index3].quantity < 1) {
        newCart3.splice(index3, 1);
      }
      return {
        ...state,
        cart: newCart3,
      };

    case SAVE_SUCCESS:
    case SAVE_FAILED:
      return state;

    default:
      return state;
  }
}
