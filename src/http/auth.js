import $host from './index'
import { isAuthAC, isSpinAC } from '../store/reducers/appReducer';
import openNotification from '../utils/openNotification';
import { getUserApi } from './user';

const loginApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post('auth/login', params)

    if (data.data) {
      localStorage.setItem('at', data.data.accessToken);
      localStorage.setItem('rt', data.data.refreshToken);
      dispatch(isAuthAC(true))
      dispatch(getUserApi())
    } else {
      openNotification('error', data.message)
    }
  } catch (e) {
    openNotification('error', `Неправильный логин или пароль`)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { loginApi }
