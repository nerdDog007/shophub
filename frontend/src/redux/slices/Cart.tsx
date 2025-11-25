import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

type Product = {
    id: number
    title: string
    price: number
    // Add any fields you need
}

interface CartState {
    products: Product[]
}

const initialState: CartState = {
    products: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        }
    },
})

export const { addProduct } = cartSlice.actions
export default cartSlice.reducer
