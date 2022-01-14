import moment from "moment";
import {api} from "../utils/axios";
import jwtDecode from "jwt-decode";

const register = (data) => {
    return api.post('/user/register', {...data})
        .then(res => res)
        .catch(error => error.response)
}

const login = (user) => {
    return api.post('/user/login', {...user})
        .then(res => res)
        .catch(error => error.response)
}

const refreshJwt = () => {
    return api.get('/user/refreshJwt')
        .then(res => {
            const { accessToken } = res.data

            // accessToken 값 및 만료시간 을 localStorage 에 저장
            const { exp } = jwtDecode(accessToken)
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('expAt', exp * 1000)

            return res
        })
        .catch(error => error.response);
}

const userAPI = {
    register, login, refreshJwt
}

export default userAPI