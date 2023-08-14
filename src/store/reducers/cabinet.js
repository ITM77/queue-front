import { createSlice } from '@reduxjs/toolkit';

const cabinet = createSlice({
  name: 'cabinet',
  initialState: {
    tickets: [],
    completedTickets: [],
    currentTicket: []
  },
  reducers: {
    completedTicketsAC(state, action) {
      state.completedTickets = action.payload
    },
    ticketsAC(state, action) {
      state.tickets = action.payload;
    },
    currentTicketAC(state, action) {
      state.currentTicket = action.payload
    }
  },
});

export const { ticketsAC, completedTicketsAC, currentTicketAC } = cabinet.actions;
export default cabinet.reducer;
