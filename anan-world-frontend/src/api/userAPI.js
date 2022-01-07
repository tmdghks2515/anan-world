import axios from "axios";

const register = (data) => {
    return axios.post('http://localhost:18080/api/user/register', {...data})
        .then(res => res)
        .catch(error => error)
}

const userAPI = {
    register
}

export default userAPI