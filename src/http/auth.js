import $host from './index'
import { isAuthAC, isSpinAC } from '../store/reducers/app';
import openNotification from '../utils/openNotification';
import { getUserApi } from './user';
import notification from '../utils/openNotification';

const loginApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post(`auth/login?locale=${currentState.lang}`, params)

    if (data.data) {
      localStorage.setItem('at', data.data.accessToken);
      localStorage.setItem('rt', data.data.refreshToken);
      dispatch(isAuthAC(true))
      dispatch(getUserApi())
    } else {
      openNotification('error', data.message)
    }
  } catch (e) {
    notification('success', currentState.lang === 'ru' ? 'Неправильный логин или пароль' : 'Логин ё парол нодуруст')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { loginApi }
