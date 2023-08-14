import $host from './index'
import { isSpinAC } from '../store/reducers/app';
import notification from '../utils/openNotification';
import { ticketsAC, completedTicketsAC, currentTicketAC } from '../store/reducers/cabinet';

const getTicketsApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    const { data } = await $host.get('cabinet')
    dispatch(completedTicketsAC(data.response.completedTickets))
    dispatch(ticketsAC(data.response.tickets))
    dispatch(currentTicketAC(data.response.currentTicket))
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const inviteTicketApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('cabinet/invite')
    dispatch(getTicketsApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const acceptTicketApi = (query) => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('cabinet/accept', query)
    dispatch(getTicketsApi())
  } catch (e) {
    notification('error', e.response.data.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

const doneTicketApi = () => async (dispatch) => {
  try {
    dispatch(isSpinAC(true))
    await $host.post('cabinet/done')
    dispatch(getTicketsApi())
  } catch (e) {
    notification('error', e.meta.message)
  }
  finally {
    dispatch(isSpinAC(false))
  }
}

export { getTicketsApi, acceptTicketApi, doneTicketApi, inviteTicketApi }
