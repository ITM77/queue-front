import $host from './index'
import { isSpinAC, servicesAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const getServicesApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('services')
    dispatch(servicesAC(data.response.items))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createServiceApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('services', query)
    dispatch(getServicesApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const updateServiceApi = (id, query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.put(`services/${id}`, query)
    dispatch(getServicesApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteServiceApi = (id) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`services/${id}`)
    dispatch(getServicesApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}


export { 
  getServicesApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi 
}
