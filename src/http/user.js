import $host from './index'
import { userAC, isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const getUserApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('me')
    dispatch(userAC(data.response))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { getUserApi }
