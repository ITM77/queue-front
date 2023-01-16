import $host from './index'

const getUserApi = () => $host.get('/me')

const createUserApi = (params) => $host.post('/users', params)

export { getUserApi, createUserApi }
