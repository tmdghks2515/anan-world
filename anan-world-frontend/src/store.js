import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from './slices/modals/loginModal'

const reducer = {
    loginModalVisible: loginModalReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;