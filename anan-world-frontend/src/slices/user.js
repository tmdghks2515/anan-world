import { createSlice } from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {message} from "antd";
import userAPI from "../api/userAPI";

const initialState = {value : { id: "", username: "", name: "", email: "", roles: [] }};

export const register = createAsyncThunk('user/register', async (data) => {
    const res = await userAPI.register(data)
    return res.data
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    // reducers는 내부에서 진행되는 action 및 동기 action을 넣는 공간이며
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },

        logout: (state) => {
            state.value = initialState.value
        }
    },
    // extraReducers는 반대로 외부/비동기 action을 넣는 공간으로 구분할 수 있다.
    extraReducers: {
        [register.fulfilled]: (state, { payload }) => {
            message.success('회원가입 성공')
        },
        [register.rejected]: (state, { error }) => {
            message.error(error.message)
        }
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer