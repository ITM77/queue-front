import $host from './index'

const claimsApi = (params) => $host.post('claims', params)

export { claimsApi }
