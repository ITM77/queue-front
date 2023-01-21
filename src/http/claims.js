import $host from './index'
import { isSpinAC, claimsAC, claimInfoAC, uploadedFileAC } from '../store/reducers/appReducer';
import notification  from '../utils/openNotification';

const getClaimsApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('/claims?page=1')
    dispatch(claimsAC(data))
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
    dispatch(getClaimsApi())
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
    dispatch(uploadedFileAC(data.data))
  } catch (e) {
    notification('error')
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { newClaimApi, getClaimsApi, getClaimByIdApi, uploadFileApi }
