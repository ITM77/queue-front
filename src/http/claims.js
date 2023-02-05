import $host from './index'
import { isSpinAC, claimsAC, claimInfoAC, uploadsAC, uploadDocumentTypesAC } from '../store/reducers/appReducer';
import notification  from '../utils/openNotification';

const getClaimsByStateApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`claims?state=${params}`)
    dispatch(claimsAC(data.data))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const newClaimApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('claims', params)
    dispatch(getClaimsByStateApi(1))
  } catch (error) {
    notification('error', error.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const editClaimApi = (id, params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post(`claims/${id}`, params)
    dispatch(getClaimsByStateApi(1))
  } catch (error) {
    notification('error', error.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const deleteClaimApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.delete(`claims/${params}`)
    notification('success', 'Заявка удалена!')
    dispatch(getClaimsByStateApi(1))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const getClaimDocumentsApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`documents?claimId=${params}`)
    dispatch(uploadsAC(data.data))
    dispatch(uploadDocumentTypesAC(data.data.documentTypes))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const getClaimByIdApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get(`/claims/${params}`)
    dispatch(claimInfoAC(data.data))
    dispatch(getClaimDocumentsApi(data.data.id))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const uploadFileApi = (params) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.post('documents', params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    dispatch(uploadsAC(data.data))
  } catch (e) {
    // notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { newClaimApi, getClaimByIdApi, uploadFileApi, getClaimDocumentsApi, getClaimsByStateApi, editClaimApi, deleteClaimApi }
