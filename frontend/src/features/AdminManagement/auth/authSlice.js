import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    employeeCount: null,
    allUsers: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    EMCMessage: ""
}

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        return await authService.register(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const normalRegister = createAsyncThunk('auth/Norregister', async (userData, thunkAPI) => {
    try {
        return await authService.normalRegister(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const viewAllUsers = createAsyncThunk('auth/vau', async (user, thunkAPI) => {
    try {
        return await authService.viewAllUsers(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logOut = createAsyncThunk('auth/logout', async () => { await authService.logout() })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
            state.user = null
            state.employeeCount = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(viewAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(viewAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allUsers = action.payload
            })
            .addCase(viewAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(normalRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(normalRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allUsers.push(action.payload)
            })
            .addCase(normalRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer