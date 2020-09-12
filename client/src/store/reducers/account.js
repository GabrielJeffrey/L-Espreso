import {
  UPDATE_USER_FAILED,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
} from "../actionTypes/actionTypes";

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
