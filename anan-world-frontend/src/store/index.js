import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {userSlice} from "../slices/user";
import {loginModalSlice} from "../slices/modals/loginModal";

const reducer = combineReducers({
    loginModalVisible: loginModalSlice.reducer,
    user: userSlice.reducer
})

const store = configureStore({
    reducer,
    devTools: true,
})

export default store;