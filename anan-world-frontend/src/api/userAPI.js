import axios from "axios";

const register = (data) => {
    return axios.post('http://localhost:18080/api/user/register', {...data})
        .then(res => res)
        .catch(error => error.response)
}

const userAPI = {
    register
}

export default userAPI