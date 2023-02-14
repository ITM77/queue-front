import $host from './index'
import notification  from '../utils/openNotification';
import { isSpinAC } from '../store/reducers/app';
import { documentTypesAC, createDocumentTypeAC } from '../store/reducers/documents';

const getAllDocTypesApi = () => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`documentTypes?all=true&locale=${currentState.lang}`)
    dispatch(documentTypesAC(data.data))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createDocumentTypesApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post(`documentTypes?locale=${currentState.lang}`, params)
    dispatch(createDocumentTypeAC(data.data))
    notification('success', currentState.lang === 'tj' ? 'Тип документа создан' : 'Намуди хуҷҷат сохта шуд')
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteDocumentTypesApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`documentTypes/${params}?locale=${currentState.lang}`)
    notification('success', currentState.lang === 'tj' ? 'Тип документа удалён' : 'Намуди хуҷҷат удалит шуд')
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const editDocumentTypesApi = (id, params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    await $host.post(`documentTypes/${id}?locale=${currentState.lang}`, params)
    notification('success', currentState.lang === 'tj' ? 'Тип документа отредактирован' : 'Намуди хуҷҷат иваз шуд')
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export {
  createDocumentTypesApi,
  getAllDocTypesApi,
  deleteDocumentTypesApi,
  editDocumentTypesApi
}
