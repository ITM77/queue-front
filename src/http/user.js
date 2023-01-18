import $host from './index'
import { userAC, isSpinAC } from '../store/reducers/appReducer';
import notification from '../utils/openNotification';

const getUserApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('')
    dispatch(userAC(data))
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
    await $host.post('/users', params)
  } catch (e) {
    notification('error')
  } finally {
    dispatch(isSpinAC(false))
  }
}

export { getUserApi, createUserApi }
