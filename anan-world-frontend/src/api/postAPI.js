import {api} from "../utils/axios";

const write = (post) => {
    return api.post('/post/write', post)
}

const list = (data) => {
    return api.get('/post/open/postList', data)
}

const read = (postId) => {
    return api.get(`/post/open/read?postId=${postId}`, {})
}

const postAPI = {
    write, list, read
}

export default postAPI