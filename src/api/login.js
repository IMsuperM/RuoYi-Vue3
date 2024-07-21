import request from '@/utils/request'
const BASE_URL = '/pp-risk/manage'
// 登录方法
export function login(username, password) {
    const data = {
        username,
        password,
        // code,
        // uuid
    }
    return request({
        url: `${BASE_URL}/realm/login`,
        //  url: '/users/test',
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: 'post',
        data: data
    })
}

// 注册方法
export function register(data) {
    return request({
        url: '/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout({ username }) {
    return request({
        url: `${BASE_URL}/realm/login-out`,
        method: 'post',
        data: { username }
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/captchaImage',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })
}