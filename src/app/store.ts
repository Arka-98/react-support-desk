import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import ticketReducer from '../features/ticketSlice'
import noteReducer from '../features/noteSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        ticket: ticketReducer,
        note: noteReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch
export default store