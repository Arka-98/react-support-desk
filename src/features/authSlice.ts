import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Input } from '../components/hooks/useForm'
import User from '../components/models/user'
import fetchData from './fetchData'

const data: { result: User, token: string, expiration: number } = JSON.parse(localStorage.getItem('user') || 'null')

interface AuthState {
    users: User[] | null,
    user: User | null,
    pendingCount: number | null
    token: string,
    expiration: number | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

const initialState: AuthState = {
    users: null,
    user: data ? data.result : null,
    pendingCount: null,
    token: data ? data.token : '',
    expiration: data ? data.expiration : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (user: Input, thunkAPI) => {
        const { is_staff, ...userData } = user
        try {
            return await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users?is_staff=${is_staff}`, 'POST', { 'content-type': 'application/json' }, JSON.stringify(userData))
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({email, password, is_staff, is_admin}: Input, thunkAPI) => {
        try {
            const userData: { result: User, token: string, expiration: number } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/login?is_staff=${is_staff}&is_admin=${is_admin}`, 'POST', { 'content-type': 'application/json' }, JSON.stringify({ email, password }))
            userData.expiration = new Date().getTime() + (1000*60*60)
            localStorage.setItem('user', JSON.stringify(userData))
            return userData
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getUsersPendingApproval = createAsyncThunk<User[], void, { state: RootState }>(
    'auth/getstaffpendingapproval',
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data: { result: User[] } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/not-approved`, 'GET', { Authorization: `Bearer ${token}` })
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getPendingApprovalCount = createAsyncThunk<number, void, { state: RootState }>(
    'auth/getpendingapprovalcount',
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data: { result: number } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/count-not-approved`, 'GET', { Authorization: `Bearer ${token}` })
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const approveUser = createAsyncThunk<string, { userId: number, approve: boolean }, { state: RootState }>(
    'auth/approveuser',
    async ({ userId, approve }, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data: { result: string } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}?approve=${approve}`, 'POST', { Authorization: `Bearer ${token}` })
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getUsers = createAsyncThunk<User[], { is_staff: boolean, is_admin: boolean }, { state: RootState }>(
    'auth/getusers',
    async ({ is_staff, is_admin }, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data: { result: User[] } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users?is_staff=${is_staff}&is_admin=${is_admin}`, 'GET', { Authorization: `Bearer ${token}` })
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteUser = createAsyncThunk<string, number, { state: RootState }>(
    'auth/deleteuser',
    async (userId, thunkAPI) => {
        const token = thunkAPI.getState().auth.token
        try {
            const data: { result: string } = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, 'DELETE', { Authorization: `Bearer ${token}` })
            return data.result
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        },
        logout: (state) => {
            localStorage.removeItem('user')
            state.user = null
            state.token = ''
            state.expiration = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.result
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = 'Logged in successfully'
                state.user = action.payload.result
                state.token = action.payload.token
                state.expiration = action.payload.expiration
            })
            .addCase(getUsersPendingApproval.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsersPendingApproval.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getUsersPendingApproval.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(getPendingApprovalCount.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPendingApprovalCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pendingCount = action.payload
            })
            .addCase(getPendingApprovalCount.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(approveUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(approveUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(approveUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
            })
    }
})

export const { reset, logout } = authSlice.actions

export default authSlice.reducer