import { createSlice } from "@reduxjs/toolkit"

export const theme = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: false,
    },
    reducers: {
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload
        }
    },
})

export const {setDarkMode} = theme.actions
export default theme.reducer