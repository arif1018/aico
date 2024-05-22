import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/AdminManagement/auth/authSlice'
import menuReducer from '../features/AdminManagement/menu/menuSlice'
import companyData from '../features/cmpProSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        cmpData: companyData,
    }
})