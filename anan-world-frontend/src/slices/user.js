import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {message} from "antd";
import userAPI from "../api/userAPI";
import _ from "lodash";
import jwtDecode from "jwt-decode";

const initialState = {value : { id: "", username: "", name: "", email: "", roles: [] , signed: false}};

export const register = createAsyncThunk('user/register', async data => {
    const res = await userAPI.register(data)
    return res.data
})

export const logout = createAsyncThunk('user/logout', async data => {
    const res = await userAPI.logout()
    return res.data
})

export const login = createAsyncThunk('user/login', async data => {
    const res = await userAPI.login(data)
    return {data: res.data, status: res.status}
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    // reducers는 내부에서 진행되는 action 및 동기 action을 넣는 공간이며
    reducers: {},
    // extraReducers는 반대로 외부/비동기 action을 넣는 공간으로 구분할 수 있다.
    extraReducers: {

        [register.fulfilled]: (state, { payload }) => {
            message.success('회원가입 성공')
        },

        [register.rejected]: (state, { error }) => {
            message.error(error.message)
        },

        [login.fulfilled]: (state, { payload }) => {
            if (_.isEqual(payload.status, 200)) {
                state.value = _.get(payload, 'data.user');
                state.value.signed = true

                // accessToken 값 및 만료시간 및 유저정보를 localStorage 에 저장
                const { accessToken } = payload.data
                const { exp } = jwtDecode(accessToken)
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('expAt', exp * 1000)
            }
        },

        [login.rejected]: (state, action) => {
            console.log('error: ', action.error)
        },

        [logout.fulfilled]: (state, { payload }) => {
            state.value = initialState.value
            message.success('로그아웃 성공')
        },

        [logout.rejected]: (state, { error }) => {
            message.error(error)
        }

    }
})

export default userSlice.reducer