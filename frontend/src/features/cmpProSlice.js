import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cmpService from './cmpProService'


const initialState = {
    companyData: [],
    employeeData: 0,
    iniAuthenticate: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

export const getEmployeeCount = createAsyncThunk('auth/getCount', async (_, thunkAPI) => {
    try {
        return await cmpService.getEmployeeCount()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const getCompanyData = createAsyncThunk('cmp/cmpData', async (_, thunkAPI) => {
    try {
        return await cmpService.getCmpData()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addCmpData = createAsyncThunk('cmp/addcmpData', async (cmpData, thunkAPI) => {
    try {
        return await cmpService.addCmpData(cmpData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getInitialCredential = createAsyncThunk('IC/initialCredential', async (initialCredential, thunkAPI) => {
    try {
        return await cmpService.getInitialCredential(initialCredential)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const cmpDataSlice = createSlice({
    name: 'cmpData',
    initialState,
    reducers: {
        reset: (state) => {
            state.companyData = []
            state.empCount = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeeCount.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEmployeeCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.employeeData = action.payload
            })
            .addCase(getEmployeeCount.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.employeeData = 0
            })
            .addCase(addCmpData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCmpData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.companyData = action.payload
            })
            .addCase(addCmpData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.companyData = []
            })
            .addCase(getCompanyData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCompanyData.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.companyData = action.payload
            })
            .addCase(getCompanyData.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.companyData = []
            })
            .addCase(getInitialCredential.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInitialCredential.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.iniAuthenticate = action.payload
            })
            .addCase(getInitialCredential.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.iniAuthenticate = false
            })
    }
})

export const { reset } = cmpDataSlice.actions

export default cmpDataSlice.reducer