import axios from "axios";
import {getCookie} from "./cookie";
import _ from "lodash";
import moment from "moment";
import {Cookies} from "react-cookie";
import {message} from "antd";
import userAPI from "../api/userAPI";
import {useSelector} from "react-redux";
import jwtDecode from "jwt-decode";

const baseURL = 'http://localhost:18080/api'

export const api = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        "Content-type": "application/json",
    }
})

const authlessUrls = ['/user/login', '/user/register', '/user/refreshJwt']

api.interceptors.request.use(
    async config => {
        // help to set cookies when cors
        config.withCredentials = true;

        // request Header 에 토큰 포함
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken)
            config.headers.Authorization = `Bearer ${accessToken}`;

        if (!authlessUrls.includes(config.url)) {
            // jwt 토큰 유효성 체크
            const expAt = localStorage.getItem('expAt')
            if(!_.isNull(expAt) && expAt < Date.now())
                await userAPI.refreshJwt()
        }
      return config;
    },
    error => Promise.reject(error)
)


/**
 api.interceptors.response.use(
    config => {
        return config
    },
    async error => {
        const response = _.get(error, 'response')
        const { status, message, config } = response
        const data = JSON.parse(_.get(config, 'data'))

        switch (status) {
            default:
                console.log('error: ', message)
        }
        // return Promise.reject(error)
    }
)*/
