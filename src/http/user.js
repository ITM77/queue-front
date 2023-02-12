import { useTranslation } from 'react-i18next';
import $host from './index'
import { userAC, isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const getUserApi = () => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`users/me?locale=${currentState.lang}`)
    dispatch(userAC(data.data))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createUserApi = (params) => async (dispatch, getState) => {
  const { t } = useTranslation();
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post(`users?locale=${currentState.lang}`, params)
    if (data.data) {
      notification('success', t('User Created'))
    } else {
      notification('error', data.message)
    }
  } catch (e) {
    notification('error', e.response.data.message)
  } finally {
    dispatch(isSpinAC(false))
  }
}

export { getUserApi, createUserApi }
