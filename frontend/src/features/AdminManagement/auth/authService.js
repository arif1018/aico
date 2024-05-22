import axios from 'axios'
import '../../../services/GlobalVariables'
const API_URL = global.SET_API_URL + "users/"

const register = async(userData)=>{

    const response = await axios.post(API_URL + 'addNewEmployee', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const normalRegister = async(userData)=>{
    // console.log(userData)
    // console.log(userData.user)
    // console.log(userData.user.userID)

    // if(userData.user.lenght > 0){
    //     if(userData.user.userID === ''){
    //         console.log('Not Found')
    //     }else{
    //         console.log('Found')
    //     }
    // }else{
    //     console.log('Not Found')
    // }
    const config = {
        headers: {
            Authorization: `Bearer ${userData.user.userStatus === null ? `Don't Enter Menu`: userData.user.userStatus}`
        }
    }

    const response = await axios.post(API_URL + 'addNewEmployee', userData, config)

    return response.data
}

const login = async(userData)=>{

    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = async()=>{localStorage.removeItem('user')}

const viewAllUsers = async(userData)=>{

    const response = await axios.get(API_URL + 'getallusers')

    return response.data
}

const authService = { register, normalRegister, logout, login, viewAllUsers }

export default authService