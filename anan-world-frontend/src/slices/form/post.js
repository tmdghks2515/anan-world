import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import postAPI from "../../api/postAPI";
import {api} from "../../utils/axios";

const initialState = {value: {postTitle: '', postContent: '', tags: [], writerName: '', commentsCnt: 0, postLikeCnt: 0, postVisitCnt: 0, createdAt: '', modifiedAt: '', comments: []}}

export const write = createAsyncThunk('post/write', async data => {
    return await postAPI.write(data)
})

export const postLike = createAsyncThunk('post/postLike', async data => {
    const res = await api.post(`/post/postLike`, data)
    return res.data
})

export const read = createAsyncThunk('post/read', async data => {
    const res = await postAPI.read(data)
    const post = res.data
    const res2 = await postAPI.comments(data)
    post.comments = res2.data
    return post
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
            state.value.writerName = payload.name
        }
    },
    extraReducers: {
        [write.fulfilled]: (state, { payload }) => {
            return payload
        },
        [write.rejected]: (state, { error }) => {
            return error
        },
        [postLike.fulfilled]: (state, { payload }) => {
            return payload
        },
        [postLike.rejected]: (state, { error }) => {
            return error
        },
        [read.fulfilled]: (state, { payload }) => {
            state.value = payload
        },
        [read.rejected]: (state, { error }) => {

        },
    }
})

export const {setTitle, setContent, setTags, setPost, clearPost, setWriter} = postSlice.actions
export default postSlice.reducer