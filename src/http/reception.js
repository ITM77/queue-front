import $host from './index'
import { isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';
import { getTicketsApi } from './cabinet';

const createQueueApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('reception', query)
    dispatch(getTicketsApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { createQueueApi }
