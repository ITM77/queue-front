import $host from './index'
import { isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const homeApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('home')
    console.log(data);
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { homeApi }
