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
export default {
    axios,
    seStorage: {
        // sessionStorage
        get: function(name) {
            return JSON.parse(sessionStorage.getItem(name))
        },
        set: function(name, data) {
            if (typeof data !== 'object') {
                sessionStorage.setItem(name, data)
            } else {
                sessionStorage.setItem(name, JSON.stringify(data))
            }
        },
    },
    loStorage: {
        // localStorage
        get: function(name) {
            return JSON.parse(localStorage.getItem(name))
        },
        set: function(name, data) {
            if (typeof data !== 'object') {
                localStorage.setItem(name, data)
            } else {
                localStorage.setItem(name, JSON.stringify(data))
            }
        },
    }




}