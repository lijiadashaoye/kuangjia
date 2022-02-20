import axios from "axios"; // vue的http功能
import {
    Message
} from "element-ui";
// vue的http功能
axios.defaults.baseURL = '';

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
let seStorage = {
    get: function(name) {
        let t = sessionStorage.getItem(name);
        try {
            JSON.parse(t)
            return JSON.parse(t)
        } catch {
            return t
        }
    },
    set: function(name, data) {
        if (data instanceof Object) {
            sessionStorage.setItem(name, JSON.stringify(data))
        } else {
            sessionStorage.setItem(name, data)
        }
    },
    clear: function(name) {
        if (name) {
            sessionStorage.removeItem(name)
        } else {
            sessionStorage.clear()
        }
    },
}
let loStorage = {
    get: function(name) {
        let t = localStorage.getItem(name);
        try {
            JSON.parse(t)
            return JSON.parse(t)
        } catch {
            return t
        }
    },
    set: function(name, data) {
        if (data instanceof Object) {
            localStorage.setItem(name, JSON.stringify(data))
        } else {
            localStorage.setItem(name, data)
        }
    },
    clear: function(name) {
        if (name) {
            localStorage.removeItem(name)
        } else {
            localStorage.clear()
        }
    },
}

export default {
    axios,
    seStorage,
    loStorage
}