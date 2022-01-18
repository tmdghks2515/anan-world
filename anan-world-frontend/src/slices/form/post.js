import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import postAPI from "../../api/postAPI";

const initialState = {value: {postTitle: '', postContent: '', tags: [], writerId: '', created: '', modified: ''}}

export const write = createAsyncThunk('post/write', async data => {
    return await postAPI.write(data)
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setTitle: (state, { payload }) => {
            state.value.postTitle = payload
        },
        setContent: (state, { payload }) => {
            state.value.postContent = payload
        },
        setTags: (state, {payload}) => {
            state.value.tags = payload
        },
        setPost: (state, {payload}) => {
            state.value = payload
        },
        clearPost : state => {
            state.value = initialState
        },
        setWriter: (state, {payload}) => {
            console.log(payload)
            state.value.writerId = payload.id
        }
    },
    extraReducers: {
        [write.fulfilled]: (state, { payload }) => {
            return payload
        },
        [write.rejected]: (state, { error }) => {
            return error
        },
    }
})

export const {setTitle, setContent, setTags, setPost, clearPost, setWriter} = postSlice.actions
export default postSlice.reducer