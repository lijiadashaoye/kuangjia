import axios from "axios"; // vue的http功能
import {
    Message
} from "element-ui";

// 根据环境设置域名
// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? '' : '';

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
    let user = localStorage.getItem("userInfo");
    if (user) {
        config.headers.token = JSON.parse(user).token
    }
    config.headers['Access-Control-Allow-Origin'] = '*'
    // 请求成功
    return config;
}, error => {
    // 请求失败
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
    // 响应成功
    if (response.status === 200) {
        return response.data
    } else {
        // 响应成功但数据有问题
        Message.error('响应成功但数据有问题')
    }
}, error => {
    console.log(error)
    // 响应失败
    return Promise.reject(error);
});
export default axios