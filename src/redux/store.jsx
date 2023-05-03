import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
import order from "./order";
import brand from "./brand/brandSlice";
import category from "./category";
import banner from "./banner";
import post from "./post";
// import auth from "./reducers/authReducer";
import address from "./address";
import auth from "./auth";
import cart from "./reducers/cartReducer";
import favorite from "./reducers/favoriteReducer";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    auth,
    cart,
    favorite,
    address,
    product,
    brand,
    category,
    banner,
    post,
    order,
  },
  devTools: process.env.NODE_ENV !== "production",
});

function UserProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default UserProvider;
