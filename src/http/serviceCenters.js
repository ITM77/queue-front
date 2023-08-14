import $host from './index'
import { isSpinAC, serviceCentersAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const getServiceCentersListApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('service-centers/list')
    dispatch(serviceCentersAC(data.response))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createServiceCenterApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('service-centers', query)
    dispatch(getServiceCentersListApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const editServiceCenterApi = (id, query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.put(`service-centers/${id}`, query)
    dispatch(getServiceCentersListApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteServiceCenterApi = (id) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`service-centers/${id}`)
    dispatch(getServiceCentersListApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}


export { 
  getServiceCentersListApi,
  createServiceCenterApi,
  editServiceCenterApi,
  deleteServiceCenterApi 
}
