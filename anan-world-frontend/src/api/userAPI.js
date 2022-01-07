import axios from "axios";

const register = (data) => {
    return axios.post('http://localhost:18080/api/user/register', {...data})
        .then(res => res)
        .catch(error => error.response)
}

const login = (user) => {
    return axios.post('http://localhost:18080/api/user/login', {...user})
        .then(res => {
            const { accessToken } = res.data
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            return res
        })
        .catch(error => error.response)
}

const userAPI = {
    register, login
}

export default userAPI