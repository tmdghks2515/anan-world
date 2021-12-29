import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
    name: "loginModalVisible",
    initialState: {value: false},
    reducers: {
        open: (state) => {
            state.value = true
        },
        close: (state) => {
            state.value = false
        }
    }
})

export const {open, close} = loginModalSlice.actions
export default loginModalSlice.reducer