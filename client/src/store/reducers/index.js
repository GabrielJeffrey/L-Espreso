import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import menu from "./menu";
import cart from "./cart";

export default combineReducers({
  alert,
  auth,
  menu,
  cart,
});
