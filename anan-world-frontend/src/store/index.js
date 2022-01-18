import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {userSlice} from "../slices/user";
import {loginModalSlice} from "../slices/modals/loginModal";
import {postSlice} from "../slices/form/post";

const reducer = combineReducers({
    loginModalVisible: loginModalSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer
})

const store = configureStore({
    reducer,
    devTools: true,
})

export default store;