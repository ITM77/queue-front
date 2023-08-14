import $host from './index'
import { isAuthAC, isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';
import { getUserApi } from './user';

const loginApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post('login', query)
    if (data.meta.success) {
      localStorage.setItem('at', data.response.token);
      dispatch(isAuthAC(true))
      dispatch(getUserApi())
    } else {
      notification('error', data.meta.message)
    }
  } catch (e) {
    notification('Неправильный логин или пароль')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const logOutApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.get('logout')
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { loginApi, logOutApi }
