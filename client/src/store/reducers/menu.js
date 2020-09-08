import {
  ADD_FILTER,
  FILTER_FAILED,
  FILTER_START,
  FILTER_SUCCESS,
  MENU_FAILED,
  MENU_SUCCESS,
} from "../actionTypes/actionTypes";

const initialState = {
  loading: true,
  foods: null,
  filter: {
    veg: false,
    nonVeg: false,
    containsEgg: false,
    customisable: false,
    category: null,
    sort: null,
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: payload,
      };
    case MENU_FAILED:
      return {
        ...state,
        loading: false,
        foods: null,
      };
    case ADD_FILTER:
      let value = !state.filter[payload.name];
      if (payload.name === "category" || payload.name === "sort") {
        value = payload.value;
      }
      return {
        ...state,
        filter: {
          ...state.filter,
          [payload.name]: value,
        },
      };
    case FILTER_START:
      return {
        ...state,
        loading: true,
        foods: null,
      };
    case FILTER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: payload,
      };

    default:
      return state;
  }
}
