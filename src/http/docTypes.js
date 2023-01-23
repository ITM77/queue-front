import $host from './index'
import notification  from '../utils/openNotification';
import { isSpinAC, claimTypesAC } from '../store/reducers/appReducer';

const createDocumentTypesApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('documentTypes', params)
    notification('success', 'Тип документа успешно создан!')
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
    notification('success', 'Тип заявки успешно создан!')
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

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

export { createClaimTypesApi, getClaimTypesApi, createDocumentTypesApi }
