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

export const login = createAsyncThunk('user/login', async data => {
    const res = await userAPI.login(data)
    return {data: res.data, status: res.status}
})

export const checkUserStatus = createAsyncThunk('user/checkUserStatus', async () => {
    const expAt = localStorage.getItem('expAt')
    
    if (expAt > Date.now()) {
        // accessToken 유효기간 안 지났을 경우
        const user = JSON.parse(localStorage.getItem('user'))
        return {user}
    } else if (expAt < Date.now()) {
        // accessToken 유효기간 지났을 경우
        const res = await userAPI.refreshJwt();
        const user = _.get(res, 'data.user');
        return {user};
    } else {
        //accessToken 이 없는 경우
        return {user: initialState.value}
    }
    
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    // reducers는 내부에서 진행되는 action 및 동기 action을 넣는 공간이며
    reducers: {
        setUser: (state, payload) => {
            state.value = payload
        },
        logout: (state) => {
            state.value = initialState
            localStorage.removeItem('user')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('expAt')
        }
    },
    // extraReducers는 반대로 외부/비동기 action을 넣는 공간으로 구분할 수 있다.
    extraReducers: {

        [register.fulfilled]: (state, { payload }) => {

        },
        [register.rejected]: (state, { error }) => {
            console.error(error.message)
        },

        [login.fulfilled]: (state, { payload }) => {
            if (_.isEqual(payload.status, 200)) {
                const user = _.get(payload, 'data.user');
                state.value = user
                state.value.signed = true
                console.log(state.value)
                // accessToken 값 및 만료시간 및 유저정보를 localStorage 에 저장
                const { accessToken } = payload.data
                const { exp } = jwtDecode(accessToken)
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('expAt', exp * 1000)
                localStorage.setItem('user', JSON.stringify(user))
            }
        },
        [login.rejected]: (state, action) => {
            console.log('error: ', action.error)
        },

        [checkUserStatus.fulfilled]: (state, {payload}) => {
            state.value = payload.user
        },
        [checkUserStatus.rejected]: (state, { error }) => {
            console.error(error)
        },

    }
})

export const {setUser, logout} = userSlice.actions
export default userSlice.reducer