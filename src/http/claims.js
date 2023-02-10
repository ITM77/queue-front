import $host from './index'
import { isSpinAC } from '../store/reducers/app';
import { claimsAC, claimInfoAC, uploadsAC, uploadDocumentTypesAC, editUploadsAC } from '../store/reducers/claims';
import notification  from '../utils/openNotification';

const getClaimsByStateApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`claims?state=${params}?locale=${currentState.lang}`)
    dispatch(claimsAC(data.data))
  } catch (e) {
    notification('error', e?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const newClaimApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    await $host.post(`claims?locale=${currentState.lang}`, params)
    dispatch(getClaimsByStateApi(1))
  } catch (error) {
    notification('error', error?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const editClaimApi = (id, params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    await $host.post(`claims/${id}?locale=${currentState.lang}`, params)
    dispatch(getClaimsByStateApi(1))
  } catch (error) {
    notification('error', error?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const approveClaimApi = (id, params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post(`claims/${id}/approve?locale=${currentState.lang}`, params)
    notification('success', data.message)
    window.location.reload()
  } catch (error) {
    notification('error', error?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteClaimApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`claims/${params}?locale=${currentState.lang}`)
    notification('success', 'Заявка удалена!')
    dispatch(getClaimsByStateApi(1))
  } catch (e) {
    notification('error', e?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const getClaimDocumentsApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`documents?claimId=${params}&locale=${currentState.lang}`)
    dispatch(uploadsAC(data.data))
    dispatch(uploadDocumentTypesAC(data.data.documentTypes))
  } catch (e) {
    console.log(e);
    notification('error', e?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const getClaimByIdApi = (params) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`/claims/${params}?locale=${currentState.lang}`)
    dispatch(claimInfoAC(data.data))
    dispatch(getClaimDocumentsApi(data.data.id))
  } catch (e) {
    notification('error', e?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const uploadFileApi = (params, index) => async (dispatch, getState) => {
  const currentState = getState().app
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post(`documents?locale=${currentState.lang}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    dispatch(editUploadsAC({index, url: data.data.path}))
  } catch (e) {
    console.log(e);
    notification('error', e?.response?.data?.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { newClaimApi, approveClaimApi, getClaimByIdApi, uploadFileApi, getClaimDocumentsApi, getClaimsByStateApi, editClaimApi, deleteClaimApi }
