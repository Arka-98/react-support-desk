import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import Note from "../components/models/note";
import fetchData from "./fetchData";

interface NoteState {
    notes: Note[] | null,
    isSuccess: boolean,
    isError: boolean,
    isLoading: boolean,
    message: string
}

const initialState: NoteState = {
    notes: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getNotesByTicketId = createAsyncThunk<Note[], number, { state: RootState }>(
    'note/getbyticketid',
    async (ticketId, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const notes: { result: Note[] } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/notes/ticket/${ticketId}`, 'GET', { Authorization: `Bearer ${token}` })
            return notes.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const createNote = createAsyncThunk<string, { text: string }, { state: RootState }>(
    'note/create',
    async (note, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        const ticketId = thunkAPI.getState().ticket.ticket?.id
        try {
            const notes: { result: string } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/notes/ticket/${ticketId}`, 'POST', { 'content-type': 'application/json', Authorization: `Bearer ${token}` }, JSON.stringify(note))
            return notes.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        resetExceptNotes: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotesByTicketId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotesByTicketId.fulfilled, (state, action) => {
                state.isSuccess = true
                state.isLoading = false
                state.notes = action.payload
            })
            .addCase(getNotesByTicketId.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = String(action.payload)
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
    }
})

export const { resetExceptNotes } = noteSlice.actions

export default noteSlice.reducer