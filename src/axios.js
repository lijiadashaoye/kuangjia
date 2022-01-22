import axios from "axios"; // vue的http功能
axios.defaults.baseURL = 'http://localhost:8888/';

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
    // console.log(config)
    // 请求成功
    return config;
}, error => {
    // 请求失败
    return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(response => {
    // 响应成功
    return response.data;
}, error => {
    // 响应失败
    return Promise.reject(error);
});

export default axios