import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { Input, Status } from "../components/hooks/useForm"
import Ticket from "../components/models/ticket"
import fetchData from "./fetchData"

interface TicketState {
    tickets: Ticket[] | null
    ticket: Ticket | null,
    count: number | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

const initialState: TicketState = {
    tickets: null,
    ticket: null,
    count: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getTicketCountByStatus = createAsyncThunk<number, string, { state: RootState }>(
    'ticket/getcount',
   async (status, thunkAPI) => {
       const token = thunkAPI.getState().auth.token
       try {
           const data: { result: number } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/tickets/count?status=${status}`, 'GET', { Authorization: `Bearer ${token}` })
           return data.result
       } catch (error: any) {
           return thunkAPI.rejectWithValue(error.message)
       }
   }
)

export const createTicket = createAsyncThunk<string, Input, { state: RootState }>(
    'ticket/create',
    async (ticket, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/tickets/`, 'POST', { 'content-type': 'application/json', Authorization: `Bearer ${token}` }, JSON.stringify(ticket))
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getTicketsByUserId = createAsyncThunk<Ticket[], void, { state: RootState }>(
    'ticket/getbyuserid',
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data: { result: Ticket[] } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/tickets/user/`, 'GET', { Authorization: `Bearer ${token}` })
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const closeTicket = createAsyncThunk<string, number, { state: RootState }>(
    'ticket/close',
   async (ticketId, thunkAPI) => {
       const token = thunkAPI.getState().auth.token
       try {
           const data: { result: string } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/tickets/${ticketId}`, 'PUT', { 'content-type': 'application/json', Authorization: `Bearer ${token}` }, JSON.stringify({ status: 'closed' }))
           return data.result
       } catch (error: any) {
           return thunkAPI.rejectWithValue(error.message)
       }
   }
)

export const getTicketById = createAsyncThunk<Ticket, number, { state: RootState }>(
    'ticket/getbyid',
    async (ticketId, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data: { result: Ticket } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/tickets/${ticketId}`, 'GET', { Authorization: `Bearer ${token}` })
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getTicketsByStaffId = createAsyncThunk<Ticket[], string, { state: RootState } >(
    'ticket/getbystaffid',
   async (status, thunkAPI) => {
       const token = thunkAPI.getState().auth.token
       try {
           const data: { result: Ticket[] } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/tickets/staff?status=${status}`, 'GET', { Authorization: `Bearer ${token}` })
           return data.result
       } catch (error: any) {
           return thunkAPI.rejectWithValue(error.message)
       }
   }
)

export const getTicketsWithUserAndStaffName = createAsyncThunk<Ticket[], void, { state: RootState } >(
    'ticket/getall',
   async (_, thunkAPI) => {
       const token = thunkAPI.getState().auth.token
       try {
           const data: { result: Ticket[] } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/tickets/`, 'GET', { Authorization: `Bearer ${token}` })
           return data.result
       } catch (error: any) {
           return thunkAPI.rejectWithValue(error.message)
       }
   }
)

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetExceptTickets: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        },
        changeTicketStatus: (state, action: PayloadAction<Status>) => {
            state.ticket!.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = String(action.payload)
            })
            .addCase(getTicketsByUserId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicketsByUserId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTicketsByUserId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(getTicketById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicketById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getTicketById.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = String(action.payload)
            })
            .addCase(closeTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(closeTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(getTicketCountByStatus.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicketCountByStatus.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.count = action.payload
            })
            .addCase(getTicketCountByStatus.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(getTicketsByStaffId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicketsByStaffId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTicketsByStaffId.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = String(action.payload)
            })
            .addCase(getTicketsWithUserAndStaffName.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicketsWithUserAndStaffName.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTicketsWithUserAndStaffName.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = String(action.payload)
            })
    }
})

export const { reset, resetExceptTickets, changeTicketStatus } = ticketSlice.actions

export default ticketSlice.reducer