import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import menu from "./menu";
import cart from "./cart";
import account from "./account";

export default combineReducers({
  alert,
  auth,
  menu,
  account,
  cart,
});
