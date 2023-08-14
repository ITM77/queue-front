import $host from './index'
import { clientsAC, isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const getAllClientsApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('clients')
    dispatch(clientsAC(data.response.items))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createNewClientApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('clients', query)
    dispatch(getAllClientsApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { getAllClientsApi, createNewClientApi }
