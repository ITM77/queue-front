import { claimTypesAC, isSpinAC, selectedClaimTypesAC, claimTypeAC } from '../store/reducers/appReducer';
import $host from './index';
import notification from '../utils/openNotification';

const getClaimTypesApi = (params) => async (dispatch, getState) => {
  const currentState = getState().appReducer
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`claimTypes?formType=${params}?locale=${currentState.lang}`)
    dispatch(claimTypesAC(data.data))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createClaimTypesApi = (params) => async (dispatch, getState) => {
  const currentState = getState().appReducer
  try {
    dispatch(isSpinAC(true))
    await $host.post(`claimTypes?locale=${currentState.lang}`, params)
    dispatch(getClaimTypesApi(params.formType))
    notification('success', 'Тип заявки успешно создан!')
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteClaimTypesApi = (params) => async (dispatch, getState) => {
  const currentState = getState().appReducer
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`claimTypes/${params}?locale=${currentState.lang}`)
    notification('success', 'Тип заявки удален!')
    dispatch(getClaimTypesApi(1))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const editClaimTypesApi = (id, params) => async (dispatch, getState) => {
  const currentState = getState().appReducer
  try {
    dispatch(isSpinAC(true))
    await $host.post(`claimTypes/${id}?locale=${currentState.lang}`, params)
    notification('success', 'Тип заявки редактирован!')
    dispatch(getClaimTypesApi(1))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const getClaimTypeByIdApi = (id) => async (dispatch, getState) => {
  const currentState = getState().appReducer
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`claimTypes/${id}?locale=${currentState.lang}`)
    dispatch(selectedClaimTypesAC(data.data.documentTypeIds))
    dispatch(claimTypeAC(data.data.claimType))
  } catch (e) {
    notification('error', e.response.data.message)
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
