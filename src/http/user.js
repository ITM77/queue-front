import $host from './index'
import { userAC, isSpinAC } from '../store/reducers/appReducer';
import notification from '../utils/openNotification';

const getUserApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('users/me?locale=ru')
    dispatch(userAC(data.data))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createUserApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post('/users', params)
    if (data.data) {
      notification('success', 'Пользователь успешно создан!')
    } else {
      notification('error', data.message)
    }
  } catch (e) {
    notification('error')
  } finally {
    dispatch(isSpinAC(false))
  }
}

export { getUserApi, createUserApi }
