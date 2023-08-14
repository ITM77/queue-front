import $host from './index'
import { usersAC, isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const getAllUsersApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('users')
    dispatch(usersAC(data.response.items))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createNewUserApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('users', query)
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { getAllUsersApi, createNewUserApi }
