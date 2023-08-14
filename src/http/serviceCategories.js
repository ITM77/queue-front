import $host from './index'
import { serviceCategoriesAC, isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';

const getServiceCategoriesApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('service-categories')
    dispatch(serviceCategoriesAC(data.response))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createServiceCategoriesApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('service-categories', query)
    dispatch(getServiceCategoriesApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const updateServiceCategoriesApi = (id, query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.put(`service-categories/${id}`, query)
    dispatch(getServiceCategoriesApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteServiceCategoriesApi = (id) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`service-categories/${id}`)
    dispatch(getServiceCategoriesApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}


export { 
  getServiceCategoriesApi,
  createServiceCategoriesApi,
  updateServiceCategoriesApi,
  deleteServiceCategoriesApi 
}
