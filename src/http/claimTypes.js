import { claimTypesAC, isSpinAC } from '../store/reducers/appReducer';
import $host from './index';
import notification from '../utils/openNotification';

const getClaimTypesApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`claimTypes?formType=${params}`)
    dispatch(claimTypesAC(data.data))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createClaimTypesApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('claimTypes', params)
    dispatch(getClaimTypesApi(params.formType))
    notification('success', 'Тип заявки успешно создан!')
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteClaimTypesApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`claimTypes/${params}`)
    notification('success', 'Тип заявки удален!')
    dispatch(getClaimTypesApi(1))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const editClaimTypesApi = (id, params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post(`claimTypes/${id}`, params)
    notification('success', 'Тип заявки редактирован!')
    dispatch(getClaimTypesApi(1))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const getClaimTypeByIdApi = (id) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`claimTypes/${id}`)
    console.log(data);
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export {
  getClaimTypesApi,
  createClaimTypesApi,
  deleteClaimTypesApi,
  editClaimTypesApi,
  getClaimTypeByIdApi
}
