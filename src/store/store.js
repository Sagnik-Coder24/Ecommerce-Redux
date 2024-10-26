import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./features/slices/sliderSlice.jsx";
import productsReducer from "./features/slices/productsSlice.jsx";
import cartReducer from "./features/slices/cartSlice.jsx";
import authReducer from "./features/slices/authSlice.jsx";

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(asyncDispatchMiddleware),
});
