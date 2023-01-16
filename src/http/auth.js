import $host from './index'

const checkApi = () => $host.get('/')

const loginApi = (params) => $host.post('auth/login', params)

export { checkApi, loginApi }
