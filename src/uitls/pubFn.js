import axios from './axios';
let seStorage = {
    get: function (name) {
        let t = sessionStorage.getItem(name);
        try {
            JSON.parse(t)
            return JSON.parse(t)
        } catch {
            return t
        }
    },
    set: function (name, data) {
        if (data instanceof Object) {
            sessionStorage.setItem(name, JSON.stringify(data))
        } else {
            sessionStorage.setItem(name, data)
        }
    },
    clear: function (name) {
        if (name) {
            sessionStorage.removeItem(name)
        } else {
            sessionStorage.clear()
        }
    },
}
let loStorage = {
    get: function (name) {
        let t = localStorage.getItem(name);
        try {
            JSON.parse(t)
            return JSON.parse(t)
        } catch {
            return t
        }
    },
    set: function (name, data) {
        if (data instanceof Object) {
            localStorage.setItem(name, JSON.stringify(data))
        } else {
            localStorage.setItem(name, data)
        }
    },
    clear: function (name) {
        if (name) {
            localStorage.removeItem(name)
        } else {
            localStorage.clear()
        }
    },
}
// 埋点函数  this.$mesh({ name: "asdfsad" });
function mesh(params) {
    axios.post('/upload', params)
        .then(res => console.log(res))
}
export default {
    seStorage,
    loStorage,
    mesh
}