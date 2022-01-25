import {api} from "../utils/axios";

const write = (post) => {
    return api.post('/post/write', post)
}

const list = (data) => {
    return api.get('/post/open/postList', data)
}

const read = (data) => {
    return api.get(`/post/open/read?postId=${data.postId}`, {})
}

const comments = (data) => {
    return api.get(`/post/open/comments?postId=${data.postId}&size=${data.size ? data.size : '10'}${data.sort ? '&sort=' + data.sort : ''}`, {})
}

const comment = (comment) => {
    return api.post(`/post/comment`, comment)
}

const postAPI = {
    write, list, read, comment, comments
}

export default postAPI