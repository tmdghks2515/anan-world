import { createSlice } from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import UserService from "../services/UserService";

const initialState = {value : { id: "", username: "", name: "", email: "", roles: [] }};

export const test = createAsyncThunk(
    "user/create",
    async ({}) => {
        const response = await UserService.getAll()
        console.log(response)
        return response
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload
            UserService.getAll()
        },

        logout: (state) => {
            state.value = initialState.value
        }
    },
    extraReducers: {
        [test.fulfilled]: (state, action) => {
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer