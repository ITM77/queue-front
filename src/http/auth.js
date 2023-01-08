import $host from './index'

const END_POINT = '/auth'

const verifyApi = (params) => $host.post(`${END_POINT}/verify`, params)

const loginApi = (params) => $host.post(`${END_POINT}/login`, params)

export { loginApi, verifyApi }
