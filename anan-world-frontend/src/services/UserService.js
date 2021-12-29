import axios from "../common/axios"

const getAll = () => {
    return axios.get("/user")
}

const UserService = {
    getAll
}

export default UserService