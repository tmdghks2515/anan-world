import {api} from "../utils/axios";

const write = (post) => {
    return api.post('/post/write', {...post})
}

const list = (data) => {
    return api.get('/post/list', {...data})
}

const postAPI = {
    write, list
}

export default postAPI