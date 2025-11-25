import { configureStore } from "@reduxjs/toolkit"
import theme from "./slices/theme"
import  productSlice from "./slices/Product"
import cartReducer from "./slices/Cart"

export const store = configureStore({
    reducer: {
        this: theme,
        product: productSlice,
        cart: cartReducer,
    },
})