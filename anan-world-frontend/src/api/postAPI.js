import {api} from "../utils/axios";

const write = (post) => {
    return api.post('/post/write', {...post})
        .then(res => res)
        .catch(error => error.response)
}

const postAPI = {
    write
}

export default postAPI