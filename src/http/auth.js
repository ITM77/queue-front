import $host from './index'

const END_POINT = '/auth'

const loginApi = (params) => $host.post(`${END_POINT}/login`, params)

export { loginApi }
