import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cartSlice";
import booksApi from "./features/books.Api";
import ordersApi from "./features/ordersApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});

export default store;
