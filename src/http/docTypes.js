import { useTranslation } from 'react-i18next';
import $host from './index'
import notification  from '../utils/openNotification';
import { isSpinAC } from '../store/reducers/app';
import { documentTypesAC, createDocumentTypeAC } from '../store/reducers/documents';

const getAllDocTypesApi = () => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`documentTypes?all=true?locale=${currentState.lang}`)
    dispatch(documentTypesAC(data.data))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const createDocumentTypesApi = (params) => async (dispatch, getState) => {
  const { t } = useTranslation();
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post(`documentTypes?locale=${currentState.lang}`, params)
    dispatch(createDocumentTypeAC(data.data))
    notification('success', t('Document Type Created'))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteDocumentTypesApi = (params) => async (dispatch, getState) => {
  const { t } = useTranslation();
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`documentTypes/${params}?locale=${currentState.lang}`)
    notification('success', t('Document Type Deleted'))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const editDocumentTypesApi = (id, params) => async (dispatch, getState) => {
  const { t } = useTranslation();
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    await $host.post(`documentTypes/${id}?locale=${currentState.lang}`, params)
    notification('success', t('Document Type Edited'))
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
