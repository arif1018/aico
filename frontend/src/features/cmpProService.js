import axios from 'axios'
import '../services/GlobalVariables'

const API_URL = global.SET_API_URL + "initialCredential/"


const getEmployeeCount = async()=>{
    
    const response = await axios.get(global.SET_API_URL + 'users/getEmployeeExist')

    return response.data
}

const addCmpData = async(cmpData)=>{

    const response = await axios.post(API_URL + 'addCmpData', cmpData)

    return response.data
}

const getCmpData = async()=>{

    const response = await axios.get(API_URL + 'getCmpData')

    return response.data
}

const getInitialCredential = async(initialCredential)=>{

    const response = await axios.post(API_URL + 'checkInitialPassword', initialCredential)

    return response.data
}

const menuService = { getCmpData, getInitialCredential, addCmpData, getEmployeeCount }

export default menuService